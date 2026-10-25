import { useMemo, useState, type CSSProperties } from 'react';
import { copy } from '../content/copy';
import type { MapNode } from '../content/types';
import { useInView } from '../hooks/useInView';
import { useLocale } from '../i18n/LocaleContext';
import { LENS_ORDER, connectorPath, labelSides, nodePoints } from '../lib/processMap';
import styles from './ProcessMap.module.css';

interface ProcessMapProps {
  nodes: MapNode[];
}

/**
 * The hero's swimlane diagram. Each node is a real step from the work further
 * down the page and links to it. Wide screens get horizontal lanes with labels
 * under the nodes; narrow screens get a vertical version where every step's
 * label, lane and source are readable before it is tapped. Only one is shown.
 */
export default function ProcessMap({ nodes }: ProcessMapProps) {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const lenses = useMemo(() => nodes.map((node) => node.lens), [nodes]);
  const horizontalPath = useMemo(() => connectorPath(nodePoints(lenses, 'horizontal'), 'horizontal'), [lenses]);
  const verticalPath = useMemo(() => connectorPath(nodePoints(lenses, 'vertical'), 'vertical'), [lenses]);
  const sides = useMemo(() => labelSides(lenses), [lenses]);
  const active = activeIndex === null ? null : nodes[activeIndex];

  return (
    <figure
      ref={ref}
      className={styles.map}
      data-drawn={inView}
      aria-labelledby="process-map-title"
      style={{ '--steps': nodes.length } as CSSProperties}
    >
      <h2 id="process-map-title" className="visually-hidden">
        {t(copy.hero.mapTitle)}
      </h2>

      {/* Wide screens */}
      <div className={styles.diagram}>
        {LENS_ORDER.map((lens, row) => (
          <div key={lens} className={styles.lane} style={{ gridRow: row + 1 }}>
            <span className={styles.laneLabel}>{t(copy.lenses[lens])}</span>
          </div>
        ))}

        <svg className={styles.connector} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.track} d={horizontalPath} vectorEffect="non-scaling-stroke" />
          <path className={styles.draw} d={horizontalPath} vectorEffect="non-scaling-stroke" />
        </svg>

        <ol className={styles.nodes} onMouseLeave={() => setActiveIndex(null)}>
          {nodes.map((node, index) => (
            <li
              key={`${node.lens}-${index}`}
              className={styles.node}
              data-lens={node.lens}
              data-label={sides[index]}
              data-active={activeIndex === index}
              data-dimmed={activeIndex !== null && activeIndex !== index}
              style={
                {
                  gridColumn: index + 1,
                  gridRow: LENS_ORDER.indexOf(node.lens) + 1,
                  '--order': index,
                } as CSSProperties
              }
            >
              <a
                href={node.href}
                className={styles.nodeLink}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              >
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.nodeLabel}>{t(node.label)}</span>
                <span className="visually-hidden">{`, ${t(copy.lenses[node.lens])}, ${t(node.source)}`}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Narrow screens */}
      <div className={styles.vertical}>
        <ol className={styles.vLanes} aria-hidden="true">
          {LENS_ORDER.map((lens) => (
            <li key={lens}>{t(copy.lenses[lens])}</li>
          ))}
        </ol>
        <div className={styles.vBody}>
          <svg className={styles.vConnector} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className={styles.track} d={verticalPath} vectorEffect="non-scaling-stroke" />
            <path className={styles.vDraw} d={verticalPath} vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className={styles.vSteps}>
            {nodes.map((node, index) => (
              <li
                key={`${node.lens}-${index}`}
                style={{ '--lane': LENS_ORDER.indexOf(node.lens), '--order': index } as CSSProperties}
              >
                <a href={node.href} className={styles.vLink}>
                  <span className={styles.vDot} aria-hidden="true" />
                  <span className={styles.vLabel}>{t(node.label)}</span>
                  <span className={styles.vMeta}>
                    <span className={styles.vLens}>{t(copy.lenses[node.lens])}</span> {t(node.source)}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <figcaption className={styles.readout}>
        <span className={styles.readoutLine} data-visible={active !== null} aria-hidden="true">
          {active ? <span>{t(active.source)}</span> : null}
        </span>
        <span className={styles.caption} data-hidden={active !== null}>
          {t(copy.hero.mapCaption)}
        </span>
      </figcaption>
    </figure>
  );
}
