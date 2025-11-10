'use client';

import { useState } from 'react';
import styles from './SummaryToggle.module.css';

type SummaryToggleProps = {
  shortSummary: string;
  longSummary: string;
};

export function SummaryToggle({ shortSummary, longSummary }: SummaryToggleProps) {
  const [view, setView] = useState<'short' | 'long'>('short');

  return (
    <section className={styles.wrapper}>
      <div className={styles.toggle}>
        <button
          type="button"
          onClick={() => setView('short')}
          className={view === 'short' ? styles.active : ''}
        >
          Short Summary
        </button>
        <button
          type="button"
          onClick={() => setView('long')}
          className={view === 'long' ? styles.active : ''}
        >
          Long Summary
        </button>
      </div>
      <article className={styles.content}>
        {view === 'short' ? (
          <p>{shortSummary}</p>
        ) : (
          longSummary.split('\n\n').map((paragraph) => (
            <p key={paragraph.slice(0, 20)}>{paragraph}</p>
          ))
        )}
      </article>
    </section>
  );
}
