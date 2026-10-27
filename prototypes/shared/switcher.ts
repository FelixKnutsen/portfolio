/*
  A small, neutral switcher between the prototypes and the current site.
  It belongs to the exploration, not to any of the designs, so it is kept
  deliberately plain.
*/
const options = [
  { key: 'a', label: 'A · Editorial', href: '/prototypes/a/' },
  { key: 'b', label: 'B · Instrument', href: '/prototypes/b/' },
  { key: 'b2', label: 'B2 · Refined', href: '/prototypes/b2/' },
  { key: 'c', label: 'C · Plan', href: '/prototypes/c/' },
  { key: 'current', label: 'Current site', href: '/en/' },
];

export function mountSwitcher(current: string): void {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Prototypes');
  nav.style.cssText = [
    'position:fixed',
    'left:50%',
    'bottom:14px',
    'transform:translateX(-50%)',
    'z-index:9999',
    'display:flex',
    'gap:2px',
    'padding:3px',
    'border-radius:999px',
    'background:rgba(20,20,20,.86)',
    'backdrop-filter:blur(8px)',
    'font:500 12px/1 system-ui,sans-serif',
    'box-shadow:0 6px 20px rgba(0,0,0,.25)',
    'max-width:calc(100vw - 16px)',
    'overflow-x:auto',
  ].join(';');
  for (const option of options) {
    const link = document.createElement('a');
    link.href = option.href;
    link.textContent = option.label;
    const active = option.key === current;
    if (active) link.setAttribute('aria-current', 'page');
    link.style.cssText = [
      'padding:8px 12px',
      'border-radius:999px',
      'white-space:nowrap',
      'text-decoration:none',
      `color:${active ? '#111' : '#eee'}`,
      `background:${active ? '#fff' : 'transparent'}`,
    ].join(';');
    nav.append(link);
  }
  document.body.append(nav);
}

/** Adds `is-in` to elements marked `data-reveal` the first time they scroll into view. */
export function revealOnScroll(root: ParentNode = document): void {
  const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((element) => element.classList.add('is-in'));
    return;
  }
  // Chrome counts an element's own clip-path when measuring visibility, so a fully clipped
  // element would never "intersect". Watch its parent instead, which is never clipped.
  const waiting = new Map<Element, HTMLElement[]>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        waiting.get(entry.target)?.forEach((element) => element.classList.add('is-in'));
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );
  for (const element of elements) {
    const target = element.parentElement ?? element;
    waiting.set(target, [...(waiting.get(target) ?? []), element]);
    observer.observe(target);
  }
}
