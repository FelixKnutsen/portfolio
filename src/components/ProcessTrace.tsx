import type { CSSProperties } from 'react';
import { useInView } from '../hooks/useInView';
import styles from './ProcessTrace.module.css';

interface TraceStep {
  title: string;
  text: string;
}

interface ProcessTraceProps {
  label: string;
  steps: TraceStep[];
}

/**
 * A case study's sequence of work, drawn as a connector through numbered steps.
 * Each step says what was actually done, so the trace is the evidence rather
 * than a decorative summary of a list further down.
 */
export default function ProcessTrace({ label, steps }: ProcessTraceProps) {
  const { ref, inView } = useInView<HTMLOListElement>();

  return (
    <div className={styles.trace}>
      <p className={styles.label}>{label}</p>
      <ol ref={ref} className={styles.steps} data-drawn={inView} style={{ '--count': steps.length } as CSSProperties}>
        {steps.map((step, index) => (
          <li key={step.title} className={styles.step} style={{ '--i': index } as CSSProperties}>
            <span className={styles.number}>{index + 1}</span>
            <span className={styles.name}>{step.title}</span>
            <span className={styles.text}>{step.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
