/*
  The layer model for B2. Three plates, People over Process over
  Technology, and one thread per project through all three. It is drawn
  complete and still: nothing assembles on scroll and nothing spins. The
  visitor can turn it within a small range and choose which thread to
  trace. The geometry is fitted to its box at every angle, so it never
  overflows or crowds its labels, and the layer labels are HTML so they
  wrap and stay readable.
*/
import type { Lens } from '../../src/content/types';
import type { ProjectKey } from './content';

export const ANGLE_MIN = -0.8;
export const ANGLE_MAX = 0.5;
export const ANGLE_START = -0.32;

const COS30 = Math.cos(Math.PI / 6);
/** Flatter than true isometric, so the plates read as layers rather than floors. */
const TILT = 0.28;
/** Vertical distance between plates, in plate half-widths. */
const GAP = 1.12;

/** Bottom to top. */
const ORDER: Lens[] = ['technology', 'process', 'people'];

/** Where each project crosses each plate, in plate coordinates (-1 to 1). */
const NODES: Record<ProjectKey, [number, number][]> = {
  phonero: [
    [-0.55, -0.2],
    [-0.5, -0.4],
    [-0.42, -0.58],
  ],
  sta: [
    [0.5, -0.5],
    [0.55, -0.15],
    [0.6, 0.15],
  ],
  kommune: [
    [0.1, 0.5],
    [-0.05, 0.6],
    [-0.15, 0.62],
  ],
};

export interface ModelState {
  angle: number;
  active: ProjectKey;
  /** The labels for the active thread, bottom to top. */
  labels: Record<Lens, string>;
}

export interface LayerAnchor {
  lens: Lens;
  /** The y of the plate's left corner, in px from the top of the box. */
  y: number;
  /** The x of the plate's left corner, where a leader line ends. */
  x: number;
}

export function drawModel(svg: SVGSVGElement, state: ModelState, inset: number): LayerAnchor[] {
  const { width, height } = svg.getBoundingClientRect();
  if (!width || !height) return [];
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const cos = Math.cos(state.angle);
  const sin = Math.sin(state.angle);
  const raw = (x: number, y: number, layer: number) => {
    const xr = x * cos - y * sin;
    const yr = x * sin + y * cos;
    return { x: (xr - yr) * COS30, y: (xr + yr) * TILT - layer * GAP };
  };

  // Fit all twelve corners into the box to the right of the labels.
  const square = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const all = ORDER.flatMap((_, layer) => square.map(([x, y]) => raw(x, y, layer)));
  const minX = Math.min(...all.map((p) => p.x));
  const maxX = Math.max(...all.map((p) => p.x));
  const minY = Math.min(...all.map((p) => p.y));
  const maxY = Math.max(...all.map((p) => p.y));
  const pad = 14;
  const room = { w: width - inset - pad * 2, h: height - pad * 2 };
  const scale = Math.min(room.w / (maxX - minX), room.h / (maxY - minY));
  const offX = inset + pad + (room.w - (maxX - minX) * scale) / 2 - minX * scale;
  const offY = pad + (room.h - (maxY - minY) * scale) / 2 - minY * scale;
  const project = (x: number, y: number, layer: number) => {
    const p = raw(x, y, layer);
    return { x: offX + p.x * scale, y: offY + p.y * scale };
  };
  const pt = (p: { x: number; y: number }) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

  const parts: string[] = [];
  const anchors: LayerAnchor[] = [];

  ORDER.forEach((lens, layer) => {
    const corners = square.map(([x, y]) => project(x, y, layer));
    parts.push(`<polygon class="plate" points="${corners.map(pt).join(' ')}" />`);
    for (const t of [-0.5, 0, 0.5]) {
      const a = project(t, -1, layer);
      const b = project(t, 1, layer);
      const c = project(-1, t, layer);
      const d = project(1, t, layer);
      parts.push(`<path class="grid" d="M${pt(a)}L${pt(b)}M${pt(c)}L${pt(d)}" />`);
    }
    const left = corners.reduce((a, b) => (b.x < a.x ? b : a));
    if (inset > 0) parts.push(`<path class="leader" d="M${inset - 6},${left.y.toFixed(1)}H${(left.x - 6).toFixed(1)}" />`);
    anchors.push({ lens, x: left.x, y: left.y });
  });

  const keys = Object.keys(NODES) as ProjectKey[];
  // The active thread is drawn last so it sits on top.
  for (const key of [...keys.filter((k) => k !== state.active), state.active]) {
    const points = NODES[key].map(([x, y], layer) => project(x, y, layer));
    const on = key === state.active;
    parts.push(`<g class="thread${on ? ' is-on' : ''}">`);
    parts.push(`<polyline points="${points.map(pt).join(' ')}" />`);
    points.forEach((p, layer) => {
      parts.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${on ? 4.5 : 2.5}" />`);
      if (!on) return;
      const label = state.labels[ORDER[layer]];
      // Mono at 13px is about 7.8px a character; flip the label left if it would run off the edge.
      const flip = p.x + 14 + label.length * 7.8 > width;
      parts.push(
        `<text x="${(p.x + (flip ? -10 : 10)).toFixed(1)}" y="${(p.y + 4).toFixed(1)}"${flip ? ' text-anchor="end"' : ''}>${label}</text>`,
      );
    });
    parts.push('</g>');
  }

  svg.innerHTML = parts.join('');
  return anchors;
}
