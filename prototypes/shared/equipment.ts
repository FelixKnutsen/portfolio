/*
  The Phonero idea as one interaction, without styling: the same equipment as
  a flat list of devices, then grouped under the person who has it. Rows move
  to their new place (FLIP). Each prototype styles the .eq-* classes its own way.
*/
import { equipment, esc } from './content';

type View = 'device' | 'person';

export function mountEquipment(root: HTMLElement, options: { autoSwitch?: boolean } = {}): void {
  let view: View = 'device';
  let touched = false;

  root.classList.add('eq');
  root.innerHTML = `
    <div class="eq-toggle" role="group" aria-label="Show the list">
      <button type="button" class="eq-option" data-view="device" aria-pressed="true">By device</button>
      <button type="button" class="eq-option" data-view="person" aria-pressed="false">By person</button>
    </div>
    <p class="eq-explain" aria-live="polite"></p>
    <ul class="eq-list"></ul>`;
  const list = root.querySelector<HTMLUListElement>('.eq-list')!;
  const explain = root.querySelector<HTMLParagraphElement>('.eq-explain')!;
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('.eq-option'));

  const rows = () => {
    if (view === 'device') {
      return equipment.devices.map((device) => ({ key: device.id, html: deviceRow(device) }));
    }
    return equipment.people.flatMap((person) => {
      const owned = equipment.devices.filter((device) => device.holder === person.id);
      return [
        {
          key: `p-${person.id}`,
          html: `<li class="eq-person" data-key="p-${person.id}"><span class="eq-name">${esc(person.name)}</span><span class="eq-team">${esc(person.team)}</span><span class="eq-count">${owned.length} devices</span></li>`,
        },
        ...owned.map((device) => ({ key: device.id, html: deviceRow(device) })),
      ];
    });
  };

  const deviceRow = (device: (typeof equipment.devices)[number]) => {
    const holder = equipment.people.find((person) => person.id === device.holder)!;
    const who = device.unregistered && view === 'device' ? '<span class="eq-flag">Not registered</span>' : esc(holder.name);
    return `<li class="eq-row" data-key="${device.id}"><span class="eq-device">${esc(device.name)}</span><span class="eq-sim">…${device.sim}</span><span class="eq-holder">${who}</span></li>`;
  };

  const render = (animate: boolean) => {
    const before = new Map<string, DOMRect>();
    if (animate) list.querySelectorAll<HTMLElement>('[data-key]').forEach((el) => before.set(el.dataset.key!, el.getBoundingClientRect()));
    list.innerHTML = rows()
      .map((row) => row.html)
      .join('');
    root.dataset.view = view;
    explain.textContent =
      view === 'device'
        ? 'Before: a flat list of devices. Whoever holds each one is registered by hand, and mistakes stay put.'
        : 'After: equipment grouped under the person who holds it. A device lands in the right place through its SIM card.';
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    list.querySelectorAll<HTMLElement>('[data-key]').forEach((el) => {
      const first = before.get(el.dataset.key!);
      const last = el.getBoundingClientRect();
      if (first) {
        el.animate([{ transform: `translate(${first.left - last.left}px, ${first.top - last.top}px)` }, { transform: 'none' }], {
          duration: 650,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
      } else {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 150, fill: 'backwards' });
      }
    });
  };

  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      touched = true;
      const next = button.dataset.view as View;
      if (next === view) return;
      view = next;
      render(true);
    }),
  );

  render(false);

  if (options.autoSwitch !== false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        window.setTimeout(() => {
          if (touched) return;
          view = 'person';
          render(true);
        }, 1100);
      },
      { threshold: 0.6 },
    );
    observer.observe(root);
  }
}
