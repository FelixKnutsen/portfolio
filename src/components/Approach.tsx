import { copy } from '../content/copy';
import { principles, skills } from '../content/work';
import { useLocale } from '../i18n/LocaleContext';
import SectionHead from './SectionHead';
import styles from './Approach.module.css';

export default function Approach() {
  const { t } = useLocale();
  const labels = copy.approach;

  return (
    <section id="approach" data-anchor data-surface="ink" className={styles.approach} aria-labelledby="approach-heading">
      <div className="frame">
        <SectionHead id="approach-heading" title={t(labels.heading)} intro={t(labels.intro)} />

        <ul className={styles.principles}>
          {principles.map((principle) => (
            <li key={principle.title.en} className={styles.principle}>
              <h3 className={styles.principleTitle}>{t(principle.title)}</h3>
              <div className={styles.principleBody}>
                <p>{t(principle.text)}</p>
                <a className={styles.evidence} href={principle.evidence.href}>
                  {t(labels.seeIn)}: {t(principle.evidence.label)}
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.skills}>
          <table className={styles.table}>
            <caption className={styles.caption}>{t(labels.skillsHeading)}</caption>
            <thead>
              <tr>
                <th scope="col">{t(labels.skillColumn)}</th>
                <th scope="col">{t(labels.whereColumn)}</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.name.en}>
                  <th scope="row">{t(skill.name)}</th>
                  <td>
                    <a href={skill.href} className={styles.where}>
                      {t(skill.where)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.coursework}>{t(labels.coursework)}</p>
        </div>
      </div>
    </section>
  );
}
