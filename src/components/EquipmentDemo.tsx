import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { copy } from '../content/copy';
import { useInView } from '../hooks/useInView';
import { useLocale } from '../i18n/LocaleContext';
import type { L } from '../i18n/locale';
import styles from './EquipmentDemo.module.css';

type View = 'device' | 'person';

interface Person {
  id: string;
  name: string;
  team: L;
}

interface Device {
  id: string;
  name: L;
  sim: string;
  holder: string;
  /** Not registered to anyone in the old list. */
  unregistered?: boolean;
  /** Only exists in the new list: it arrived through its SIM card. */
  added?: boolean;
}

// Made-up people and devices. They only illustrate the idea from the thesis.
const people: Person[] = [
  { id: 'kari', name: 'Kari', team: { no: 'Salg', en: 'Sales' } },
  { id: 'jonas', name: 'Jonas', team: { no: 'Lager', en: 'Warehouse' } },
  { id: 'amina', name: 'Amina', team: { no: 'Økonomi', en: 'Finance' } },
];

const devices: Device[] = [
  { id: 'd1', name: { no: 'iPhone 15', en: 'iPhone 15' }, sim: '4821', holder: 'kari' },
  { id: 'd2', name: { no: 'Galaxy S24', en: 'Galaxy S24' }, sim: '7730', holder: 'jonas' },
  { id: 'd3', name: { no: 'iPad Air', en: 'iPad Air' }, sim: '1194', holder: 'kari' },
  { id: 'd4', name: { no: '4G-ruter', en: '4G router' }, sim: '5502', holder: 'amina', unregistered: true },
  { id: 'd5', name: { no: 'iPhone 13', en: 'iPhone 13' }, sim: '3307', holder: 'jonas', unregistered: true },
  { id: 'd6', name: { no: 'Mobilt bredbånd', en: 'Mobile broadband' }, sim: '9045', holder: 'amina' },
  { id: 'd7', name: { no: 'Galaxy A55', en: 'Galaxy A55' }, sim: '6218', holder: 'kari', added: true },
];

type Entry = { kind: 'person'; person: Person; count: number } | { kind: 'device'; device: Device };

function entriesFor(view: View): Entry[] {
  if (view === 'device') {
    return devices.filter((device) => !device.added).map((device) => ({ kind: 'device', device }));
  }
  return people.flatMap((person) => {
    const owned = devices.filter((device) => device.holder === person.id);
    return [
      { kind: 'person' as const, person, count: owned.length },
      ...owned.map((device) => ({ kind: 'device' as const, device })),
    ];
  });
}

const keyOf = (entry: Entry) => (entry.kind === 'person' ? `p-${entry.person.id}` : entry.device.id);

/**
 * The Phonero idea in one interaction: the same equipment, first as a flat
 * list of devices, then grouped under the person who has it. Rows move to
 * their new place (FLIP), and a new device joins its owner through its SIM.
 * On first view it switches once by itself to show the change.
 */
export default function EquipmentDemo() {
  const { t } = useLocale();
  const labels = copy.equipment;
  const [view, setView] = useState<View>('device');
  const touched = useRef(false);
  const items = useRef(new Map<string, HTMLLIElement>());
  const before = useRef(new Map<string, DOMRect>());
  const { ref, inView } = useInView<HTMLElement>(0.5);

  const choose = (next: View, byUser = true) => {
    if (byUser) touched.current = true;
    if (next === view) return;
    before.current = new Map(Array.from(items.current, ([key, element]) => [key, element.getBoundingClientRect()]));
    setView(next);
  };

  // Demonstrate the change once, when the list is first seen, unless the visitor got there first.
  useEffect(() => {
    if (!inView || touched.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => {
      if (!touched.current) choose('person', false);
    }, 900);
    return () => window.clearTimeout(timer);
    // `choose` changes every render; the timer only needs to start once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useLayoutEffect(() => {
    const previous = before.current;
    if (previous.size === 0) return;
    before.current = new Map();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    items.current.forEach((element, key) => {
      const last = element.getBoundingClientRect();
      const first = previous.get(key);
      if (reduce) return;
      if (first) {
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (dx || dy) {
          element.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
            duration: 620,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          });
        }
      } else {
        const added = element.dataset.added !== undefined;
        element.animate(
          added
            ? [
                { opacity: 0, transform: 'translateX(24px)', backgroundColor: 'var(--note)' },
                { opacity: 1, transform: 'none', backgroundColor: 'var(--note)', offset: 0.5 },
                { opacity: 1, transform: 'none' },
              ]
            : [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }],
          { duration: added ? 1600 : 420, delay: added ? 520 : 140, easing: 'ease-out', fill: 'backwards' },
        );
      }
    });
  }, [view]);

  const entries = entriesFor(view);

  return (
    <figure ref={ref} className={styles.demo} data-view={view}>
      <div className={styles.toolbar}>
        <p className={styles.title} id="equipment-title">
          {t(labels.title)}
        </p>
        <div className={styles.toggle} role="group" aria-label={t(labels.viewLabel)}>
          {(['device', 'person'] as const).map((option) => (
            <button
              key={option}
              type="button"
              className={styles.toggleOption}
              aria-pressed={view === option}
              onClick={() => choose(option)}
            >
              {t(option === 'device' ? labels.byDevice : labels.byPerson)}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.explain} aria-live="polite">
        {t(view === 'device' ? labels.before : labels.after)}
      </p>

      <div className={styles.columns} aria-hidden="true">
        <span>{t(labels.device)}</span>
        <span>{t(labels.sim)}</span>
        <span className={styles.holderColumn}>{t(labels.holder)}</span>
      </div>

      <ul className={styles.list} aria-labelledby="equipment-title">
        {entries.map((entry) => {
          const key = keyOf(entry);
          const register = (element: HTMLLIElement | null) => {
            if (element) items.current.set(key, element);
            else items.current.delete(key);
          };
          if (entry.kind === 'person') {
            return (
              <li key={key} ref={register} className={styles.person}>
                <span className={styles.avatar} aria-hidden="true">
                  {entry.person.name[0]}
                </span>
                <span className={styles.personName}>
                  {entry.person.name}
                  <span className={styles.team}>{t(entry.person.team)}</span>
                </span>
                <span className={styles.count}>
                  {entry.count} {t(entry.count === 1 ? labels.device1 : labels.devices)}
                </span>
              </li>
            );
          }
          const { device } = entry;
          const holder = people.find((person) => person.id === device.holder);
          return (
            <li key={key} ref={register} className={styles.row} data-added={device.added ? '' : undefined}>
              <span className={styles.deviceName}>{t(device.name)}</span>
              <span className={styles.sim}>…{device.sim}</span>
              <span className={styles.holder}>
                {device.unregistered ? (
                  <span className={styles.flag}>{t(labels.unregistered)}</span>
                ) : (
                  holder?.name
                )}
              </span>
              {device.added ? <span className={styles.addedTag}>{t(labels.viaSim)}</span> : null}
            </li>
          );
        })}
      </ul>

      <figcaption className={styles.caption}>{t(labels.caption)}</figcaption>
    </figure>
  );
}
