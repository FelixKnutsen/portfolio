import { useRef, useState, type KeyboardEvent } from 'react';
import { copy } from '../content/copy';
import type { Evidence } from '../content/types';
import { useLocale } from '../i18n/LocaleContext';
import styles from './WebsiteDemo.module.css';

type Tab = 'site' | 'guide';
const TABS: Tab[] = ['site', 'guide'];

/**
 * The STA website seen by its two audiences: visitors get the site, editors get
 * a guide written for people who have never used WordPress. The second view is
 * the reason the project moved from Next.js to WordPress.
 */
export default function WebsiteDemo({ evidence }: { evidence?: Evidence }) {
  const { t } = useLocale();
  const labels = copy.website;
  const [tab, setTab] = useState<Tab>('site');
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ site: null, guide: null });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = TABS.indexOf(tab);
    let next: Tab | null = null;
    if (event.key === 'ArrowRight') next = TABS[(index + 1) % TABS.length];
    if (event.key === 'ArrowLeft') next = TABS[(index - 1 + TABS.length) % TABS.length];
    if (event.key === 'Home') next = TABS[0];
    if (event.key === 'End') next = TABS[TABS.length - 1];
    if (!next) return;
    event.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={styles.demo}>
      <div className={styles.tabs} role="tablist" aria-label={t(labels.tabsLabel)}>
        {TABS.map((option) => (
          <button
            key={option}
            ref={(element) => {
              tabRefs.current[option] = element;
            }}
            type="button"
            role="tab"
            id={`sta-tab-${option}`}
            aria-selected={tab === option}
            aria-controls={`sta-panel-${option}`}
            tabIndex={tab === option ? 0 : -1}
            className={styles.tab}
            onClick={() => setTab(option)}
            onKeyDown={onKeyDown}
          >
            {t(option === 'site' ? labels.siteTab : labels.guideTab)}
          </button>
        ))}
      </div>

      <div className={styles.window}>
        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.address}>
            {tab === 'site' ? t(labels.url) : 'github.com/FelixKnutsen/stastudentphp'}
          </span>
        </div>

        <div
          role="tabpanel"
          id="sta-panel-site"
          aria-labelledby="sta-tab-site"
          hidden={tab !== 'site'}
          className={styles.panel}
        >
          {evidence ? (
            <figure className={styles.shot}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${evidence.src}-640.webp 640w, ${evidence.src}-1060.webp 1060w`}
                  sizes="(max-width: 56rem) 92vw, 50vw"
                />
                <img
                  src={`${evidence.src}-1060.jpg`}
                  width={evidence.width}
                  height={evidence.height}
                  alt={t(evidence.alt)}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <figcaption className="visually-hidden">{t(evidence.caption)}</figcaption>
            </figure>
          ) : null}
        </div>

        <div
          role="tabpanel"
          id="sta-panel-guide"
          aria-labelledby="sta-tab-guide"
          hidden={tab !== 'guide'}
          className={`${styles.panel} ${styles.guide}`}
        >
          <p className={styles.guideTitle}>{t(labels.guideTitle)}</p>
          <p className={styles.guideIntro}>{t(labels.guideIntro)}</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t(labels.wantTo)}</th>
                <th scope="col">{t(labels.goTo)}</th>
              </tr>
            </thead>
            <tbody>
              {labels.guideRows.map((row) => (
                <tr key={row.want.en}>
                  <td>{t(row.want)}</td>
                  <td>
                    <span className={styles.path}>{t(row.go)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className={styles.caption}>{tab === 'site' && evidence ? t(evidence.caption) : t(labels.guideCaption)}</p>
    </div>
  );
}
