import type { Lens } from '../content/types';

export const LENS_ORDER: Lens[] = ['people', 'process', 'technology'];

/** Horizontal: steps run left to right through lanes stacked as rows. Vertical: steps run downwards through lanes side by side. */
export type Orientation = 'horizontal' | 'vertical';

export interface Point {
  x: number;
  y: number;
}

/** Centre of each node in a 0–100 coordinate space (one slot per step, one per lane). */
export function nodePoints(lenses: readonly Lens[], orientation: Orientation = 'horizontal'): Point[] {
  const steps = lenses.length;
  const lanes = LENS_ORDER.length;
  return lenses.map((lens, index) => {
    const along = ((index + 0.5) / steps) * 100;
    const across = ((LENS_ORDER.indexOf(lens) + 0.5) / lanes) * 100;
    return orientation === 'horizontal' ? { x: along, y: across } : { x: across, y: along };
  });
}

/**
 * An orthogonal connector through every node, the way a process diagram
 * routes flow between swimlanes: straight runs along the direction of flow,
 * and changes of lane halfway between steps.
 */
export function connectorPath(points: readonly Point[], orientation: Orientation = 'horizontal'): string {
  if (points.length === 0) return '';
  const [first] = points;

  if (orientation === 'vertical') {
    const segments: string[] = [`M ${first.x} 0`, `V ${first.y}`];
    for (let i = 1; i < points.length; i++) {
      const midY = (points[i - 1].y + points[i].y) / 2;
      segments.push(`V ${midY}`, `H ${points[i].x}`, `V ${points[i].y}`);
    }
    segments.push('V 100');
    return segments.join(' ');
  }

  const segments: string[] = [`M 0 ${first.y}`, `H ${first.x}`];
  for (let i = 1; i < points.length; i++) {
    const midX = (points[i - 1].x + points[i].x) / 2;
    segments.push(`H ${midX}`, `V ${points[i].y}`, `H ${points[i].x}`);
  }
  segments.push('H 100');
  return segments.join(' ');
}

/**
 * Which side of each dot its label goes on. Connectors only run from a dot
 * towards the lanes of its neighbours, so the label takes the side no
 * neighbour lies on. If neighbours lie on both sides it goes below, where a
 * label halo keeps any crossing line behind the text.
 */
export function labelSides(lenses: readonly Lens[]): ('above' | 'below')[] {
  return lenses.map((lens, index) => {
    const lane = LENS_ORDER.indexOf(lens);
    const neighbours = [lenses[index - 1], lenses[index + 1]]
      .filter((neighbour): neighbour is Lens => neighbour !== undefined)
      .map((neighbour) => LENS_ORDER.indexOf(neighbour));
    const neighbourAbove = neighbours.some((other) => other < lane);
    const neighbourBelow = neighbours.some((other) => other > lane);
    return neighbourBelow && !neighbourAbove ? 'above' : 'below';
  });
}
