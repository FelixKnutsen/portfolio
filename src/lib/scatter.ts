/**
 * Pure helpers for the hero, where fragments of work start scattered and sort
 * themselves into columns as the visitor scrolls. Kept free of the DOM so the
 * layout maths can be tested.
 */

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

/** A small, fast, seeded random number generator (mulberry32), so the scatter is the same on every visit. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Each item starts sorting a little after the one before it, so the board
 * fills in as a wave rather than all at once. `spread` is the share of the
 * scroll used for the stagger.
 */
export function staggered(progress: number, index: number, count: number, spread = 0.35): number {
  const delay = count > 1 ? (index / (count - 1)) * spread : 0;
  return easeInOutCubic(clamp((progress - delay) / (1 - spread)));
}

function overlaps(a: Rect, b: Rect, margin: number): boolean {
  return !(
    a.x + a.width + margin <= b.x ||
    b.x + b.width + margin <= a.x ||
    a.y + a.height + margin <= b.y ||
    b.y + b.height + margin <= a.y
  );
}

/**
 * Places boxes of the given sizes at random inside `area`, avoiding the
 * `avoid` rectangles (the headline, the buttons) and each other where
 * possible. Returns the top-left corner for each box, in the same order.
 * Uses rejection sampling with a fixed seed; if a box cannot be placed
 * cleanly it takes the least crowded candidate instead of failing.
 */
export function scatter(sizes: { width: number; height: number }[], area: Rect, avoid: Rect[], seed = 7): Point[] {
  const random = seededRandom(seed);
  const placed: Rect[] = [];
  const margin = 10;

  return sizes.map(({ width, height }) => {
    const maxX = Math.max(area.x, area.x + area.width - width);
    const maxY = Math.max(area.y, area.y + area.height - height);
    let best: Rect | null = null;
    let bestCollisions = Infinity;

    for (let attempt = 0; attempt < 60; attempt++) {
      const candidate = { x: lerp(area.x, maxX, random()), y: lerp(area.y, maxY, random()), width, height };
      const collisions =
        avoid.filter((rect) => overlaps(candidate, rect, margin)).length * 10 +
        placed.filter((rect) => overlaps(candidate, rect, margin)).length;
      if (collisions < bestCollisions) {
        best = candidate;
        bestCollisions = collisions;
      }
      if (collisions === 0) break;
    }

    placed.push(best!);
    return { x: best!.x, y: best!.y };
  });
}
