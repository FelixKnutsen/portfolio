import { Fragment, useRef, type CSSProperties } from 'react';
import { copy } from '../content/copy';
import type { Lens } from '../content/types';
import { mapNodes, problems } from '../content/work';
import { useHeroSort } from '../hooks/useHeroSort';
import { useLocale } from '../i18n/LocaleContext';
import Magnetic from './Magnetic';
import styles from './Hero.module.css';

const LENSES: Lens[] = ['people', 'process', 'technology'];

/**
 * The first line of the claim is about people, so it starts loose: each word
 * at its own width and weight. As the work is sorted it settles into the same
 * wide, heavy setting as the second line, which is about systems.
 */
const LOOSE_WORDS = [
  { width: '90%', weight: 380 },
  { width: '125%', weight: 880 },
  { width: '64%', weight: 900 },
  { width: '106%', weight: 520 },
];

export default function Hero() {
  const { locale, t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { mode, pinned } = useHeroSort(sectionRef, stageRef, locale);
  const lines = t(copy.hero.headline);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      data-surface="blue"
      data-sort={mode}
      data-pin={pinned ? '' : undefined}
      aria-labelledby="hero-heading"
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={`frame ${styles.layout}`}>
          <div className={styles.copy}>
            <p className={styles.name} data-sort-avoid>
              Felix Fabricius Knutsen
            </p>
            <h1 id="hero-heading" className={styles.headline} data-sort-avoid>
              {[lines.slice(0, 2), lines.slice(2)].map((pair, row) => (
                <Fragment key={row}>
                  {/* Rows are blocks, but the text between them still needs a space to read as one sentence. */}
                  {row > 0 ? ' ' : null}
                  <span className={styles.row}>
                    {pair.map((part, index) => (
                      <Fragment key={part}>
                        {index > 0 ? ' ' : null}
                        <span className={styles.part} style={{ '--i': row * 2 + index } as CSSProperties}>
                          <span className={styles.partInner}>
                            {row === 0
                              ? part.split(' ').map((word, wordIndex) => {
                                  const loose = LOOSE_WORDS[(index * 2 + wordIndex) % LOOSE_WORDS.length];
                                  return (
                                    <Fragment key={word}>
                                      {wordIndex > 0 ? ' ' : null}
                                      <span
                                        className={styles.word}
                                        style={{ '--loose-width': loose.width, '--loose-weight': loose.weight } as CSSProperties}
                                      >
                                        {word}
                                      </span>
                                    </Fragment>
                                  );
                                })
                              : part}
                          </span>
                        </span>
                      </Fragment>
                    ))}
                  </span>
                </Fragment>
              ))}
            </h1>
            <div className={styles.meta} data-sort-from>
              <p className={styles.role} data-sort-avoid>
                {t(copy.hero.role)}
              </p>
              <div className={styles.actions} data-sort-avoid>
                <Magnetic>
                  <a className={styles.primary} href="#work">
                    {t(copy.hero.primaryCta)}
                  </a>
                </Magnetic>
                <a className={styles.secondary} href="#contact">
                  {t(copy.hero.secondaryCta)}
                </a>
              </div>
            </div>
          </div>

          <nav className={styles.board} aria-labelledby="board-heading" data-sort-board>
            <div className={styles.boardHead}>
              <h2 id="board-heading" className={styles.boardHeading}>
                {t(copy.hero.boardHeading)}
              </h2>
              <p className={styles.hint} aria-hidden="true">
                {t(copy.hero.scrollHint)}
              </p>
            </div>
            <p className="visually-hidden">{t(copy.hero.boardIntro)}</p>
            <div className={styles.columns}>
              {LENSES.map((lens) => (
                <div key={lens} className={styles.column}>
                  <h3 className={styles.columnHeading}>{t(copy.lenses[lens])}</h3>
                  <ul className={styles.chips}>
                    {mapNodes
                      .filter((node) => node.lens === lens)
                      .map((node) => (
                        <li key={node.label.en} className={styles.chipItem} data-minor={node.minor ? '' : undefined}>
                          <a className={styles.chip} href={node.href} data-sort-item>
                            <span className={styles.chipLabel}>{t(node.label)}</span>
                            <span className="visually-hidden">, </span>
                            <span className={styles.chipSource}>{t(node.source)}</span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <ul className={styles.notes} aria-hidden="true">
          {problems.map((problem) => (
            <li key={problem.en} className={styles.note} data-sort-note>
              {t(problem)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
