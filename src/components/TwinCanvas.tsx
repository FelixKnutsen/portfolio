import { useEffect, useRef, useState } from 'react';
import { copy } from '../content/copy';
import { useLocale } from '../i18n/LocaleContext';
import { clamp, easeInOutCubic } from '../lib/scatter';
import { blockAt, blockName, buildBlocks, fitView, prism, project, type View } from '../lib/twin';
import styles from './TwinCanvas.module.css';

const COLS = 8;
const ROWS = 6;

interface Tip {
  name: string;
  storeys: number;
  x: number;
  y: number;
}

type Rgb = [number, number, number];

function toRgb(hex: string): Rgb {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16)) as Rgb;
}

/** Mixes two colours like CSS color-mix(): `amount` of `a`, the rest `b`, with optional transparency. */
function mix(a: Rgb, b: Rgb, amount: number, alpha = 1): string {
  const channel = (index: number) => Math.round(a[index] * amount + b[index] * (1 - amount));
  return `rgb(${channel(0)} ${channel(1)} ${channel(2)} / ${alpha})`;
}

/**
 * An isometric grid of city blocks, to explain what a digital twin models.
 * The blocks rise when first seen, a scan line sweeps the grid as if the
 * model were syncing with data, and pointing at a block reads its data.
 * Drawn on a 2D canvas: no library needed for a few dozen boxes.
 */
export default function TwinCanvas() {
  const { t } = useLocale();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!wrap || !canvas || !context) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = getComputedStyle(wrap);
    const colour = (name: string) => style.getPropertyValue(name).trim();
    const blue = toRgb(colour('--blue'));
    const line = toRgb(colour('--on-ink'));
    const soft = toRgb(colour('--on-ink-soft'));
    const note = colour('--note');
    const night: Rgb = [11, 14, 34];

    const blocks = buildBlocks(COLS, ROWS);
    const maxStoreys = Math.max(...blocks.map((block) => block.storeys));
    let view: View = { unit: 1, origin: { x: 0, y: 0 } };
    let width = 0;
    let height = 0;
    let hovered = -1;
    let frame = 0;
    let visible = false;
    let grownAt = reduce ? 0 : -1;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      view = fitView(width, height, COLS, ROWS, maxStoreys);
    };

    const path = (points: { x: number; y: number }[]) => {
      context.beginPath();
      points.forEach((point, index) => (index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y)));
      context.closePath();
    };

    const draw = (now: number) => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      const elapsed = grownAt < 0 ? 0 : now - grownAt;
      // The scan runs diagonally across the grid and back to the start.
      const scan = reduce ? -10 : ((now / 2600) % 1) * (COLS + ROWS + 4) - 2;

      // Street grid on the ground.
      context.lineWidth = 1;
      context.strokeStyle = mix(soft, soft, 1, 0.22);
      for (let gx = 0; gx <= COLS; gx++) {
        const a = project(view, gx, 0);
        const b = project(view, gx, ROWS);
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
      for (let gy = 0; gy <= ROWS; gy++) {
        const a = project(view, 0, gy);
        const b = project(view, COLS, gy);
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      let growing = false;
      blocks.forEach((block, index) => {
        const delay = (block.gx + block.gy) * 70;
        const grown = reduce || grownAt === 0 ? 1 : easeInOutCubic(clamp((elapsed - delay) / 800));
        if (grown < 1) growing = true;
        const faces = prism(view, block, block.storeys * grown);
        const near = 1 - clamp(Math.abs(block.gx + block.gy - scan) / 1.2);
        const isHovered = index === hovered;

        if (block.storeys === 0) {
          // An open square: a dotted ground plate.
          path(faces.top);
          context.fillStyle = mix(soft, soft, 1, 0.1 + near * 0.2);
          context.fill();
          return;
        }

        path(faces.right);
        context.fillStyle = mix(blue, night, 0.16 + near * 0.3);
        context.fill();
        path(faces.left);
        context.fillStyle = mix(blue, night, 0.3 + near * 0.35);
        context.fill();
        path(faces.top);
        context.fillStyle = isHovered ? note : mix(blue, night, 0.6 + near * 0.4);
        context.fill();

        context.lineWidth = 1;
        context.strokeStyle = mix(line, line, 1, 0.22 + near * 0.7);
        [faces.top, faces.left, faces.right].forEach((face) => {
          path(face);
          context.stroke();
        });
      });

      if (visible && (growing || !reduce)) frame = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const pointAt = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onPointer = (event: PointerEvent) => {
      const point = pointAt(event);
      const index = blockAt(view, blocks, point);
      if (index === hovered) return;
      hovered = index;
      if (index < 0) setTip(null);
      else {
        const block = blocks[index];
        const anchor = prism(view, block, block.storeys).top[0];
        setTip({ name: blockName(block), storeys: block.storeys, x: anchor.x, y: anchor.y });
      }
      schedule();
    };

    const onLeave = () => {
      hovered = -1;
      setTip(null);
      schedule();
    };

    resize();
    const resizer = new ResizeObserver(() => {
      resize();
      schedule();
    });
    resizer.observe(wrap);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && grownAt < 0) grownAt = performance.now();
        if (visible) schedule();
      },
      { threshold: 0.25 },
    );
    observer.observe(wrap);

    canvas.addEventListener('pointermove', onPointer);
    canvas.addEventListener('pointerdown', onPointer);
    canvas.addEventListener('pointerleave', onLeave);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      resizer.disconnect();
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerdown', onPointer);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <figure className={styles.figure}>
      <div ref={wrapRef} className={styles.stage}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        {tip ? (
          <span className={styles.tip} style={{ left: tip.x, top: tip.y }} aria-hidden="true">
            {t(copy.twin.block)} {tip.name}
            {tip.storeys ? `, ${tip.storeys} ${t(copy.twin.storeys)}` : null}
          </span>
        ) : null}
      </div>
      <figcaption className={styles.caption}>{t(copy.twin.caption)}</figcaption>
    </figure>
  );
}
