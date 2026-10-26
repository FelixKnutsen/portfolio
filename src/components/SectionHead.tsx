import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  id: string;
  title: string;
  intro?: ReactNode;
}

/** The heading and short introduction that open each section, on the same grid everywhere. */
export default function SectionHead({ id, title, intro }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
