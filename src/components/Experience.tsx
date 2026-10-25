import { useCallback, useEffect, useState } from 'react';
import { copy } from '../content/copy';
import { roles } from '../content/roles';
import type { Role } from '../content/types';
import { useLocale } from '../i18n/LocaleContext';
import { formatPeriod } from '../lib/dates';
import SectionHead from './SectionHead';
import TimelineChart from './TimelineChart';
import styles from './Experience.module.css';

const ROLE_PREFIX = 'role-';

function roleIdFromHash(hash: string): string | null {
  const id = hash.replace(/^#/, '');
  return id.startsWith(ROLE_PREFIX) ? id.slice(ROLE_PREFIX.length) : null;
}

interface RoleItemProps {
  role: Role;
  expanded: boolean;
  onToggle: (id: string) => void;
}

function RoleItem({ role, expanded, onToggle }: RoleItemProps) {
  const { locale, t } = useLocale();
  const detailsId = `${ROLE_PREFIX}${role.id}-details`;
  const ongoing = role.period.end === null;

  return (
    <li>
      <article id={`${ROLE_PREFIX}${role.id}`} className={styles.role} data-expanded={expanded}>
        <p className={styles.rolePeriod}>
          <time dateTime={role.period.start}>{formatPeriod(role.period, locale)}</time>
          {ongoing ? <span className={styles.ongoing}>{t(copy.experience.ongoing)}</span> : null}
          {role.kind === 'project' ? <span className={styles.kindTag}>{t(copy.experience.legend.project)}</span> : null}
        </p>
        <div className={styles.roleBody}>
          <h4 className={styles.roleTitle}>{t(role.title)}</h4>
          <p className={styles.roleOrg}>
            {role.org}
            {role.place ? `, ${t(role.place)}` : ''}
          </p>
          <p className={styles.roleSummary}>{t(role.summary)}</p>

          {role.details || role.storyHref ? (
            <div className={styles.roleActions}>
              {role.details ? (
                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={expanded}
                  aria-controls={detailsId}
                  onClick={() => onToggle(role.id)}
                >
                  <span className={styles.toggleIcon} aria-hidden="true" />
                  {t(expanded ? copy.experience.hideDetails : copy.experience.showDetails)}
                </button>
              ) : null}
              {role.storyHref ? (
                <a className="link" href={role.storyHref}>
                  {t(copy.experience.readCase)}
                  <span className="visually-hidden">: {t(role.title)}</span>
                </a>
              ) : null}
            </div>
          ) : null}

          {role.details ? (
            <div id={detailsId} className={styles.details} hidden={!expanded}>
              <ul>
                {t(role.details).map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </article>
    </li>
  );
}

export default function Experience() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const fromHash = roleIdFromHash(window.location.hash);
    return new Set(fromHash ? [fromHash] : []);
  });

  const open = useCallback((id: string) => {
    setExpanded((current) => (current.has(id) ? current : new Set(current).add(id)));
  }, []);

  const toggle = useCallback((id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const id = roleIdFromHash(window.location.hash);
      if (id) open(id);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [open]);

  return (
    <section id="experience" data-anchor className={`frame ${styles.section}`} aria-labelledby="experience-heading">
      <SectionHead id="experience-heading" title={t(copy.experience.heading)} variant="compact">
        <p>{t(copy.experience.intro)}</p>
      </SectionHead>

      <TimelineChart onSelect={open} />

      <section className={styles.group} aria-labelledby="track-work">
        <h3 id="track-work" className={styles.groupTitle} data-track="work">
          <span className={styles.swatch} aria-hidden="true" />
          {t(copy.experience.tracks.work)}
        </h3>
        <ol className={styles.roleList}>
          {roles
            .filter((role) => role.track === 'work')
            .map((role) => (
              <RoleItem key={role.id} role={role} expanded={expanded.has(role.id)} onToggle={toggle} />
            ))}
        </ol>
      </section>
    </section>
  );
}
