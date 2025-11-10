import Link from 'next/link';
import { SeasonCarousel } from '@/components/SeasonCarousel';
import { TopRankings } from '@/components/TopRankings';
import { animeList } from '@/data/anime';
import styles from './page.module.css';

const ongoingSeason = {
  season: 'Spring',
  year: 2024
} as const;

export default function HomePage() {
  const ongoing = animeList.filter(
    (anime) => anime.season === ongoingSeason.season && anime.year === ongoingSeason.year
  );

  const latestDeepDives = animeList
    .slice()
    .sort((a, b) => b.year - a.year || b.ratingCount - a.ratingCount)
    .slice(0, 4);

  return (
    <main>
        <SeasonCarousel anime={ongoing} />
        <section className={`${styles.heroCopy} container`}>
          <div className={styles.heroText}>
            <h1>
              Anime insights evolved<span>.</span>
            </h1>
            <p>
              Anime Vista fuses community-driven sentiment with editorial storytelling.
              Experience dual-layer summaries, pros versus cons breakdowns, and rankings that
              respond to seasonal momentum.
            </p>
            <div className={styles.heroActions}>
              <Link href="/genres" className="button-link">
                Browse by Genre
              </Link>
              <Link href="/anime/celestial-requiem" className={styles.secondaryLink}>
                Read a deep-dive review →
              </Link>
            </div>
          </div>
          <div className={styles.metrics}>
            <div className={styles.metricCard}>
              <span>Dual Summaries</span>
              <p>Toggle between snackable recaps and full narrative breakdowns.</p>
            </div>
            <div className={styles.metricCard}>
              <span>Community Pulse</span>
              <p>Pros and cons sourced from curated, spoiler-tagged watch parties.</p>
            </div>
            <div className={styles.metricCard}>
              <span>Seasonal Shift</span>
              <p>Rankings refresh weekly to spotlight on-going season disruptors.</p>
            </div>
          </div>
        </section>

        <TopRankings anime={animeList} />

        <section className={`${styles.differentiators} container`}>
          <header>
            <span className="tag">Why It&apos;s Different</span>
            <h2>The format built for binge watchers and lore keepers alike</h2>
          </header>
          <div className={styles.diffGrid}>
            <article className="glass-panel">
              <h3>Instant toggle summaries</h3>
              <p>
                Every title ships with a short synopsis for quick recall and a long-form essay that
                dives into arcs, themes, and production context without filler.
              </p>
            </article>
            <article className="glass-panel">
              <h3>Pros & Cons as community signals</h3>
              <p>
                Bullet-point sentiment distills thousands of moderated watch party comments into
                actionable highlights, giving you quick confidence before committing hours.
              </p>
            </article>
            <article className="glass-panel">
              <h3>Living charts and trend radar</h3>
              <p>
                Seasonal slideshow, top charts, and trending heatmap reflect viewership velocity and
                score swings pulled from partner platforms every weekend.
              </p>
            </article>
          </div>
        </section>

        <section className={`${styles.latest} container`}>
          <header className={styles.latestHeader}>
            <div>
              <span className="tag">Latest Deep Dives</span>
              <h2>Fresh community-backed reviews</h2>
            </div>
            <Link href="/genres" className={styles.secondaryLink}>
              See full library →
            </Link>
          </header>
          <div className={styles.latestGrid}>
            {latestDeepDives.map((anime) => (
              <article key={anime.slug} className={`${styles.latestCard} glass-panel`}>
                <div
                  className={styles.latestArt}
                  style={{ backgroundImage: `url(${anime.posterImage})` }}
                />
                <div className={styles.latestContent}>
                  <h3>{anime.title}</h3>
                  <p className={styles.meta}>
                    {anime.season} {anime.year} • {anime.genres.slice(0, 3).join(' • ')}
                  </p>
                  <p>{anime.shortSummary}</p>
                  <div className={styles.summaryToggle}>
                    <span>Short</span>
                    <span>Long</span>
                  </div>
                  <Link href={`/anime/${anime.slug}`} className="button-link">
                    Open Review
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
    </main>
  );
}
