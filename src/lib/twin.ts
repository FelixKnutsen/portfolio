import { seededRandom, type Point } from './scatter';

/**
 * Geometry for the digital-twin illustration: a grid of city blocks drawn in
 * isometric projection. Pure functions, so drawing and hit-testing agree and
 * can be tested without a canvas.
 */

export interface Block {
  /** Column and row on the street grid. */
  gx: number;
  gy: number;
  /** Height in storeys; 0 for an open square or park. */
  storeys: number;
}

export interface View {
  /** Length of one grid cell along an isometric axis, in CSS pixels. */
  unit: number;
  origin: Point;
}

const COS30 = Math.cos(Math.PI / 6);
/** Visual height of one storey relative to a cell. */
export const STOREY = 0.13;
/** Share of each cell left for the street around a block. */
export const STREET = 0.3;

/** A regular grid of blocks, a few of them open squares, like a planned town centre. Same seed, same town. */
export function buildBlocks(cols: number, rows: number, seed = 21): Block[] {
  const random = seededRandom(seed);
  const blocks: Block[] = [];
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const open = random() < 0.08;
      // Taller towards the middle of town, lower at the edges, with the odd tall building anywhere.
      const centre = 1 - Math.hypot(gx / (cols - 1) - 0.5, gy / (rows - 1) - 0.5) * 1.4;
      const tower = random() < 0.12 ? 3 : 0;
      blocks.push({ gx, gy, storeys: open ? 0 : Math.max(1, Math.round(1 + random() * 3 + centre * 4 + tower)) });
    }
  }
  // Painter's order: back to front.
  return blocks.sort((a, b) => a.gx + a.gy - (b.gx + b.gy) || a.gx - b.gx);
}

export function project(view: View, x: number, y: number, z = 0): Point {
  return {
    x: view.origin.x + (x - y) * view.unit * COS30,
    y: view.origin.y + (x + y) * view.unit * 0.5 - z * view.unit,
  };
}

/** Scales and centres the grid inside a canvas of the given size. */
export function fitView(width: number, height: number, cols: number, rows: number, maxStoreys: number): View {
  const spanX = (cols + rows) * COS30;
  const spanY = (cols + rows) * 0.5 + maxStoreys * STOREY;
  const unit = Math.min((width * 0.92) / spanX, (height * 0.9) / spanY);
  const drawnHeight = spanY * unit;
  return {
    unit,
    origin: {
      x: width / 2 - ((cols - rows) / 2) * unit * COS30,
      y: (height - drawnHeight) / 2 + maxStoreys * STOREY * unit,
    },
  };
}

export interface Prism {
  top: Point[];
  left: Point[];
  right: Point[];
  /** Outline of the whole block, for hit-testing. */
  outline: Point[];
}

/** The visible faces of a block raised to `height` storeys (fractional while it grows). */
export function prism(view: View, block: Block, height: number): Prism {
  const x0 = block.gx + STREET / 2;
  const y0 = block.gy + STREET / 2;
  const x1 = block.gx + 1 - STREET / 2;
  const y1 = block.gy + 1 - STREET / 2;
  const z = height * STOREY;
  const p = (x: number, y: number, h: number) => project(view, x, y, h);

  const top = [p(x0, y0, z), p(x1, y0, z), p(x1, y1, z), p(x0, y1, z)];
  const left = [p(x0, y1, z), p(x1, y1, z), p(x1, y1, 0), p(x0, y1, 0)];
  const right = [p(x1, y0, z), p(x1, y1, z), p(x1, y1, 0), p(x1, y0, 0)];
  const outline = [p(x0, y0, z), p(x1, y0, z), p(x1, y0, 0), p(x1, y1, 0), p(x0, y1, 0), p(x0, y1, z)];
  return { top, left, right, outline };
}

/** Ray-casting point-in-polygon test. */
export function contains(polygon: Point[], point: Point): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i];
    const b = polygon[j];
    if (a.y > point.y !== b.y > point.y && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
  }
  return inside;
}

/** The front-most block under a point, or -1. `blocks` must be in painter's order. */
export function blockAt(view: View, blocks: Block[], point: Point): number {
  for (let index = blocks.length - 1; index >= 0; index--) {
    if (contains(prism(view, blocks[index], blocks[index].storeys).outline, point)) return index;
  }
  return -1;
}

/** Street-grid name of a block, like a map reference: columns A, B, C…, rows 1, 2, 3… */
export function blockName(block: Block): string {
  return `${String.fromCharCode(65 + block.gx)}${block.gy + 1}`;
}
