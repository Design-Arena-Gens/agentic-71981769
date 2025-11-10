'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Anime } from '@/data/anime';
import styles from './SeasonCarousel.module.css';

type SeasonCarouselProps = {
  anime: Anime[];
};

const AUTO_ROTATE_MS = 6000;

export function SeasonCarousel({ anime }: SeasonCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const ordered = useMemo(
    () =>
      anime
        .slice()
        .sort((a, b) => b.communityScore - a.communityScore)
        .slice(0, 10),
    [anime]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ordered.length);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timer);
  }, [ordered.length]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.viewport}>
        {ordered.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={item.slug}
              className={`${styles.slide} ${isActive ? styles.active : ''}`}
              style={{ backgroundImage: `url(${item.bannerImage})` }}
            >
              <div className={styles.overlay}>
                <div className={styles.content}>
                  <span className="tag">
                    #{String(index + 1).padStart(2, '0')} | {item.season}{' '}
                    {item.year}
                  </span>
                  <h2>{item.title}</h2>
                  <p>{item.shortSummary}</p>
                  <ul className={styles.highlights}>
                    {item.synopsisHighlights.slice(0, 3).map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className={styles.meta}>
                    <span>Community Score {item.communityScore.toFixed(1)}</span>
                    <span>Rating {item.rating.toFixed(1)}</span>
                  </div>
                  <Link href={`/anime/${item.slug}`} className="button-link">
                    Dive Into Review
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.dots}>
        {ordered.map((_item, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
