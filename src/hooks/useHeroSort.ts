import { useEffect, useState, type RefObject } from 'react';
import { clamp, easeInOutCubic, lerp, scatter, seededRandom, staggered, type Rect } from '../lib/scatter';

/**
 * - `pending`: before hydration. Fragments are hidden by CSS when scripting is on.
 * - `live`: the scroll-linked sort runs.
 * - `static`: reduced motion. The sorted board is shown as is.
 */
export type SortMode = 'pending' | 'live' | 'static';

export interface HeroSort {
  mode: SortMode;
  /**
   * The stage is pinned while the work sorts when the whole hero fits in the
   * smallest viewport height. On shorter screens (most phones) it scrolls
   * normally and the fragments sort while the board scrolls into view.
   */
  pinned: boolean;
}

interface Fragment {
  el: HTMLElement;
  dx: number;
  dy: number;
  rotate: number;
  scale: number;
  opacity: number;
  depth: number;
  phase: number;
}

/** Room left for the fixed header when scattering. */
const HEADER_ROOM = 72;

/** The smallest viewport height (100svh), which is what the pinned stage is sized to. */
function smallViewportHeight(): number {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;top:0;height:100svh;visibility:hidden;pointer-events:none';
  document.body.append(probe);
  const height = probe.offsetHeight || window.innerHeight;
  probe.remove();
  return height;
}

/** Height the stage's content needs, independent of how tall the stage itself is. */
function contentHeight(stage: HTMLElement): number {
  const layout = stage.firstElementChild as HTMLElement | null;
  if (!layout) return 0;
  const style = getComputedStyle(layout);
  const children = Array.from(layout.children) as HTMLElement[];
  const gaps = (parseFloat(style.rowGap) || 0) * Math.max(0, children.length - 1);
  const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  return children.reduce((sum, child) => sum + child.offsetHeight, 0) + gaps + padding;
}

/**
 * Drives the hero: fragments marked `data-sort-item` start scattered around
 * the stage (keeping clear of anything marked `data-sort-avoid`) and settle
 * into their place in the board as the visitor scrolls. Notes marked
 * `data-sort-note` drift away. Progress is written to `--sort` on the stage
 * for anything CSS should fade with it.
 *
 * Final positions come from normal layout, so the board is correct without
 * JavaScript and at every screen size; the hook only ever animates towards it.
 */
export function useHeroSort(
  section: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLElement | null>,
  layoutKey: string,
): HeroSort {
  const [state, setState] = useState<HeroSort>({ mode: 'pending', pinned: false });

  useEffect(() => {
    const stageEl = stage.current;
    if (!stageEl) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => {
      const pinned = contentHeight(stageEl) <= smallViewportHeight();
      const mode = motion.matches ? 'static' : 'live';
      setState((current) => (current.mode === mode && current.pinned === pinned ? current : { mode, pinned }));
    };
    decide();
    motion.addEventListener('change', decide);
    window.addEventListener('resize', decide);
    return () => {
      motion.removeEventListener('change', decide);
      window.removeEventListener('resize', decide);
    };
  }, [stage, layoutKey]);

  const { mode, pinned } = state;

  useEffect(() => {
    const sectionEl = section.current;
    const stageEl = stage.current;
    if (mode !== 'live' || !sectionEl || !stageEl) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let items: Fragment[] = [];
    let notes: Fragment[] = [];
    let frame = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    /** Unpinned: how far the page scrolls before the board is sorted. */
    let sortDistance = 1;
    const startedAt = performance.now();

    const measure = () => {
      const chipEls = Array.from(stageEl.querySelectorAll<HTMLElement>('[data-sort-item]')).filter(
        (el) => el.offsetParent !== null,
      );
      const noteEls = Array.from(stageEl.querySelectorAll<HTMLElement>('[data-sort-note]'));
      [...chipEls, ...noteEls].forEach((el) => (el.style.transform = ''));

      const box = stageEl.getBoundingClientRect();
      const relative = (el: Element): Rect => {
        const rect = el.getBoundingClientRect();
        return { x: rect.left - box.left, y: rect.top - box.top, width: rect.width, height: rect.height };
      };
      const avoid = Array.from(stageEl.querySelectorAll('[data-sort-avoid]')).map(relative);
      // The pile lies below the claim, where the board will form, not across the headline.
      const from = stageEl.querySelector('[data-sort-from]');
      const top = Math.max(HEADER_ROOM, from ? relative(from).y - 8 : HEADER_ROOM);
      const area = { x: 8, y: top, width: box.width - 16, height: box.height - top - 12 };
      const noteRects = noteEls.map(relative);
      const chipRects = chipEls.map(relative);
      const targets = scatter([...noteRects, ...chipRects], area, avoid, 11);
      const random = seededRandom(5);

      const fragment = (el: HTMLElement, from: Rect, index: number, tilt: number): Fragment => {
        const depth = random();
        return {
          el,
          dx: targets[index].x - from.x,
          dy: targets[index].y - from.y,
          rotate: lerp(-tilt, tilt, random()),
          scale: lerp(0.84, 1.1, depth),
          opacity: lerp(0.45, 1, depth),
          depth,
          phase: random() * Math.PI * 2,
        };
      };
      notes = noteEls.map((el, index) => fragment(el, noteRects[index], index, 8));
      items = chipEls.map((el, index) => fragment(el, chipRects[index], noteEls.length + index, 16));

      // Unpinned, the board is sorted once its bottom edge has scrolled well into view.
      const board = stageEl.querySelector('[data-sort-board]');
      const boardBottom = board ? board.getBoundingClientRect().bottom + window.scrollY : box.bottom + window.scrollY;
      const distance = boardBottom - window.innerHeight * 0.8;
      sortDistance = distance > 80 ? distance : window.innerHeight * 0.4;
    };

    const progressNow = () => {
      if (pinned) {
        const distance = Math.max(1, sectionEl.offsetHeight - window.innerHeight);
        return clamp(-sectionEl.getBoundingClientRect().top / distance);
      }
      return clamp(window.scrollY / sortDistance);
    };

    const render = (now: number) => {
      frame = 0;
      const progress = progressNow();
      smoothX += (pointerX - smoothX) * 0.07;
      smoothY += (pointerY - smoothY) * 0.07;
      const time = (now - startedAt) / 1000;

      items.forEach((item, index) => {
        const settled = staggered(progress, index, items.length);
        if (settled >= 1) {
          // Settled: hand the fragment back to normal layout so its text renders crisply.
          item.el.style.transform = '';
          item.el.style.opacity = '';
          item.el.style.pointerEvents = '';
          item.el.style.removeProperty('--fill');
          return;
        }
        // Loose fragments are outlines; they fill in as solid cards in the last part of their move.
        item.el.style.setProperty('--fill', clamp((settled - 0.55) / 0.45).toFixed(3));
        // Loose fragments move and overlap, so they only become clickable once they have settled.
        item.el.style.pointerEvents = 'none';
        const loose = 1 - settled;
        const x = item.dx + Math.sin(time * 0.55 + item.phase) * 7 + smoothX * item.depth * 26;
        const y = item.dy + Math.cos(time * 0.45 + item.phase) * 6 + smoothY * item.depth * 18;
        item.el.style.transform = `translate3d(${(x * loose).toFixed(2)}px, ${(y * loose).toFixed(2)}px, 0) rotate(${(item.rotate * loose).toFixed(2)}deg) scale(${lerp(item.scale, 1, settled).toFixed(3)})`;
        item.el.style.opacity = lerp(item.opacity, 1, settled).toFixed(3);
      });

      const away = easeInOutCubic(clamp(progress / 0.5));
      notes.forEach((note) => {
        const x = note.dx + Math.sin(time * 0.4 + note.phase) * 5 + smoothX * note.depth * 30 + note.rotate * 14 * away;
        const y = note.dy + Math.cos(time * 0.35 + note.phase) * 5 + smoothY * note.depth * 20 - 60 * away;
        note.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${(note.rotate * (1 + away)).toFixed(2)}deg)`;
        note.el.style.opacity = (1 - away).toFixed(3);
      });

      stageEl.style.setProperty('--sort', progress.toFixed(3));
      const pointerMoving = Math.abs(pointerX - smoothX) + Math.abs(pointerY - smoothY) > 0.002;
      if (visible && (progress < 1 || pointerMoving)) frame = requestAnimationFrame(render);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const remeasure = () => {
      measure();
      schedule();
    };

    // Keyboard focus in the board finishes the sort, so focus never lands on a moving target.
    const board = stageEl.querySelector<HTMLElement>('[data-sort-board]');
    const onFocus = () => {
      if (progressNow() >= 1) return;
      const end = pinned ? sectionEl.offsetTop + sectionEl.offsetHeight - window.innerHeight : sortDistance;
      window.scrollTo({ top: end, behavior: 'instant' });
    };

    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    measure();
    render(performance.now());
    stageEl.setAttribute('data-ready', '');

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    visibility.observe(sectionEl);

    let resizeFrame = 0;
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(remeasure);
    });
    resize.observe(stageEl);
    document.fonts?.ready.then(remeasure);

    window.addEventListener('scroll', schedule, { passive: true });
    board?.addEventListener('focusin', onFocus);
    if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('pointermove', onPointer);
      board?.removeEventListener('focusin', onFocus);
      [...items, ...notes].forEach(({ el }) => {
        el.style.transform = '';
        el.style.opacity = '';
        el.style.pointerEvents = '';
        el.style.removeProperty('--fill');
      });
      stageEl.style.removeProperty('--sort');
      stageEl.removeAttribute('data-ready');
    };
  }, [mode, pinned, section, stage, layoutKey]);

  return state;
}
