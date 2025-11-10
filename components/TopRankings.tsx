import Link from 'next/link';
import { Anime } from '@/data/anime';
import styles from './TopRankings.module.css';

type TopRankingsProps = {
  anime: Anime[];
};

export function TopRankings({ anime }: TopRankingsProps) {
  const topRated = anime
    .slice()
    .sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount)
    .slice(0, 8);

  const trending = anime
    .slice()
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 10);

  return (
    <section className={`${styles.wrapper} container`}>
      <div className={styles.inner}>
        <div className={styles.topCharts}>
          <header className={styles.sectionHeader}>
            <div>
              <span className="tag">Top Charts</span>
              <h3>Highest Rated Anime Right Now</h3>
            </div>
            <Link href="/genres" className={styles.moreLink}>
              View full charts →
            </Link>
          </header>
          <div className={styles.grid}>
            {topRated.map((item, index) => (
              <Link key={item.slug} href={`/anime/${item.slug}`} className={styles.card}>
                <div
                  className={styles.poster}
                  style={{ backgroundImage: `url(${item.posterImage})` }}
                >
                  <span className={styles.rank}>#{index + 1}</span>
                </div>
                <div className={styles.info}>
                  <h4>{item.title}</h4>
                  <p>
                    {item.rating.toFixed(1)} • {item.genres.slice(0, 2).join(' • ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <aside className={`${styles.trending} glass-panel`}>
          <header>
            <span className="tag">Trending</span>
            <h3>Most Viewed This Year</h3>
          </header>
          <ol className={styles.trendingList}>
            {trending.map((item, index) => (
              <li key={item.slug} className={styles.trendingItem}>
                <span className={styles.trendingRank}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <Link href={`/anime/${item.slug}`}>{item.title}</Link>
                  <p>{item.rating.toFixed(1)} community score</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
