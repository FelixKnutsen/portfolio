import type { ReactNode } from 'react';
import styles from './SectionHead.module.css';

interface SectionHeadProps {
  id: string;
  title: string;
  /**
   * `display` opens the page's main chapters with a heavy rule and very large type.
   * `compact` is for reference sections, so a long page does not repeat one loud pattern.
   */
  variant?: 'display' | 'compact';
  children?: ReactNode;
}

/** Heading block for a main section: a lane rule, the title and an optional intro. */
export default function SectionHead({ id, title, variant = 'display', children }: SectionHeadProps) {
  return (
    <div className={styles.head} data-variant={variant}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children ? <div className={styles.intro}>{children}</div> : null}
    </div>
  );
}
