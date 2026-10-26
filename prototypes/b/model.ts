/*
  The layer model: People, Process and Technology as three plates in
  isometric 3D, the way information systems are usually described. Each
  project is a thread through all three. Drawn as SVG from a small
  projection, so labels stay upright and crisp at any angle.
*/

export type ProjectKey = 'phonero' | 'sta' | 'kommune';

interface Node {
  label: string;
  layer: 0 | 1 | 2;
  x: number;
  y: number;
  project?: ProjectKey;
}

const LAYERS = ['Technology', 'Process', 'People'];

const NODES: Node[] = [
  { label: 'User interviews', layer: 2, x: -0.62, y: -0.3, project: 'phonero' },
  { label: 'Editors’ guide', layer: 2, x: 0.55, y: -0.42, project: 'sta' },
  { label: 'Cross-team meetings', layer: 2, x: 0.05, y: 0.58, project: 'kommune' },
  { label: 'Student representatives', layer: 2, x: 0.62, y: 0.42 },
  { label: 'MoSCoW', layer: 1, x: -0.48, y: -0.5, project: 'phonero' },
  { label: 'Migration', layer: 1, x: 0.45, y: -0.15, project: 'sta' },
  { label: 'Process mapping', layer: 1, x: -0.1, y: 0.52, project: 'kommune' },
  { label: 'Sprints', layer: 1, x: -0.66, y: 0.18 },
  { label: 'React, GraphQL', layer: 0, x: -0.52, y: -0.18, project: 'phonero' },
  { label: 'Next.js to WordPress', layer: 0, x: 0.52, y: -0.5, project: 'sta' },
  { label: 'Digital twins', layer: 0, x: 0.12, y: 0.46, project: 'kommune' },
  { label: 'TypeScript', layer: 0, x: -0.18, y: -0.68 },
];

const COS30 = Math.cos(Math.PI / 6);

export interface ModelState {
  angle: number;
  /** Space between the plates; grows as the visitor scrolls into the projects. */
  spread: number;
  active: ProjectKey | null;
}

export function drawModel(svg: SVGSVGElement, state: ModelState): void {
  const box = svg.getBoundingClientRect();
  const width = box.width;
  const height = box.height;
  if (!width || !height) return;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const size = Math.min(width / 3.5, height / (2.3 + 2 * state.spread * 1.25));
  const cx = width / 2;
  const cy = height / 2 + state.spread * size * 0.95;
  const cos = Math.cos(state.angle);
  const sin = Math.sin(state.angle);
  const project = (x: number, y: number, layer: number) => {
    const xr = x * cos - y * sin;
    const yr = x * sin + y * cos;
    return { x: cx + (xr - yr) * size * COS30, y: cy + (xr + yr) * size * 0.5 - layer * state.spread * size * 1.25 };
  };
  const pt = (p: { x: number; y: number }) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;

  const parts: string[] = [];
  for (let layer = 0; layer < 3; layer++) {
    const corners = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].map(([x, y]) => project(x, y, layer));
    parts.push(`<polygon class="plate" points="${corners.map(pt).join(' ')}" />`);
    const line = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      `<line class="grid" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" />`;
    for (let i = 1; i < 4; i++) {
      const t = -1 + i * 0.5;
      parts.push(line(project(t, -1, layer), project(t, 1, layer)), line(project(-1, t, layer), project(1, t, layer)));
    }
    // Label each plate just inside its left-most corner, whichever that is at this angle.
    const left = corners.reduce((a, b) => (b.x < a.x ? b : a));
    parts.push(`<text class="layer-label" x="${(left.x + 16).toFixed(1)}" y="${(left.y - 10).toFixed(1)}">${LAYERS[layer]}</text>`);
  }

  for (const key of ['phonero', 'sta', 'kommune'] as ProjectKey[]) {
    const points = NODES.filter((node) => node.project === key)
      .sort((a, b) => a.layer - b.layer)
      .map((node) => project(node.x, node.y, node.layer));
    const on = state.active === key;
    parts.push(`<polyline class="thread${on ? ' is-on' : ''}" points="${points.map(pt).join(' ')}" />`);
  }

  for (const node of NODES) {
    const p = project(node.x, node.y, node.layer);
    const on = node.project !== undefined && node.project === state.active;
    const off = state.active !== null && !on;
    parts.push(
      `<g class="node${on ? ' is-on' : ''}${off ? ' is-off' : ''}"><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${on ? 5 : 3.2}" /><text x="${(p.x + 10).toFixed(1)}" y="${(p.y + 4).toFixed(1)}">${node.label}</text></g>`,
    );
  }

  svg.innerHTML = parts.join('');
}
