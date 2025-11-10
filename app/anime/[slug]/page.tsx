import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SummaryToggle } from '@/components/SummaryToggle';
import { animeList } from '@/data/anime';
import styles from './page.module.css';

type AnimePageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: AnimePageProps): Metadata {
  const anime = animeList.find((item) => item.slug === params.slug);

  if (!anime) {
    return {
      title: 'Anime Not Found | Anime Vista'
    };
  }

  return {
    title: `${anime.title} Review & Community Insights | Anime Vista`,
    description: anime.shortSummary
  };
}

export default function AnimePage({ params }: AnimePageProps) {
  const anime = animeList.find((item) => item.slug === params.slug);

  if (!anime) {
    notFound();
  }

  const related = animeList
    .filter((item) => item.slug !== anime.slug && item.genres.some((genre) => anime.genres.includes(genre)))
    .slice(0, 3);

  return (
    <main>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${anime.bannerImage})` }}
      >
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <div className={styles.badgeRow}>
            <span className="tag">
              {anime.season} {anime.year}
            </span>
            <span className="tag">{anime.studio}</span>
          </div>
          <h1>{anime.title}</h1>
          <p>{anime.shortSummary}</p>
          <div className={styles.heroStats}>
            <div>
              <span>Community Score</span>
              <strong>{anime.communityScore.toFixed(1)}</strong>
            </div>
            <div>
              <span>Critic Rating</span>
              <strong>{anime.rating.toFixed(1)}</strong>
            </div>
            <div>
              <span>Episodes</span>
              <strong>{anime.episodes}</strong>
            </div>
            <div>
              <span>Watch Count</span>
              <strong>{(anime.viewCount / 1000).toFixed(0)}K</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.details} container`}>
        <div className={styles.leftPanel}>
          <SummaryToggle shortSummary={anime.shortSummary} longSummary={anime.longSummary} />

          <div className={`${styles.prosCons} glass-panel`}>
            <h2>Community Pros & Cons</h2>
            <div className={styles.proConColumns}>
              <div>
                <h3>Pros</h3>
                <ul>
                  {anime.pros.map((pro) => (
                    <li key={pro}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Cons</h3>
                <ul>
                  {anime.cons.map((con) => (
                    <li key={con}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={`${styles.highlights} glass-panel`}>
            <h2>Spotlight Moments</h2>
            <ul>
              {anime.synopsisHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={`${styles.posterCard} pulse-border`}>
            <div
              className={styles.poster}
              style={{ backgroundImage: `url(${anime.posterImage})` }}
            />
            <div className={styles.meta}>
              <div>
                <span>Genres</span>
                <p>{anime.genres.join(', ')}</p>
              </div>
              <div>
                <span>Platforms</span>
                <p>{anime.streamingPlatforms.join(', ')}</p>
              </div>
              <div>
                <span>Rating Count</span>
                <p>{anime.ratingCount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className={`${styles.related} glass-panel`}>
            <h2>Related Deep Dives</h2>
            <ul>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/anime/${item.slug}`}>
                    <span>{item.title}</span>
                    <small>
                      {item.communityScore.toFixed(1)} • {item.genres[0]}
                    </small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
