import { blockAt, buildBlocks, fitView, prism, project as projectPoint, type View } from '../../src/lib/twin';
import { t, twinLabels, ui } from './content';

// The digital-twin grid, drawn once and redrawn only when a block is pointed at.
export function mountTwin(root: HTMLElement): void {
  const canvas = root.querySelector('canvas')!;
  const output = root.querySelector('output')!;
  const context = canvas.getContext('2d')!;
  const blocks = buildBlocks(8, 6);
  const max = Math.max(...blocks.map((block) => block.storeys));
  let view: View = { unit: 1, origin: { x: 0, y: 0 } };
  let hover = -1;
  let width = 0;
  let height = 0;

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(232, 228, 214, 0.12)';
    for (let i = 0; i <= 8; i++) {
      const a = projectPoint(view, i, 0);
      const b = projectPoint(view, i, 6);
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
    for (let j = 0; j <= 6; j++) {
      const a = projectPoint(view, 0, j);
      const b = projectPoint(view, 8, j);
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
    blocks.forEach((block, index) => {
      if (!block.storeys) return;
      const faces = prism(view, block, block.storeys);
      for (const [face, alpha] of [
        [faces.right, 0.04],
        [faces.left, 0.08],
        [faces.top, index === hover ? 0.85 : 0.1],
      ] as const) {
        context.beginPath();
        face.forEach((p, i) => (i ? context.lineTo(p.x, p.y) : context.moveTo(p.x, p.y)));
        context.closePath();
        context.fillStyle = `rgba(240, 180, 69, ${alpha})`;
        context.fill();
        context.strokeStyle = 'rgba(232, 228, 214, 0.32)';
        context.stroke();
      }
    });
  };

  const resize = () => {
    const rect = root.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    view = fitView(width, height, 8, 6, max);
    draw();
  };

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const next = blockAt(view, blocks, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    if (next === hover) return;
    hover = next;
    const block = blocks[hover];
    output.textContent = block
      ? `${twinLabels.block} ${String.fromCharCode(65 + block.gx)}${block.gy + 1}, ${block.storeys} ${twinLabels.storeys}`
      : t(ui.twinIdle);
    draw();
  });
  canvas.addEventListener('pointerleave', () => {
    hover = -1;
    output.textContent = t(ui.twinIdle);
    draw();
  });

  new ResizeObserver(resize).observe(root);
}
