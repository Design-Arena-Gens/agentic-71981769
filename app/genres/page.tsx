import Link from 'next/link';
import { clsx } from 'clsx';
import { animeList } from '@/data/anime';
import styles from './page.module.css';

const genreDescriptions: Record<string, string> = {
  'Sci-Fi':
    'From mecha odysseys to speculative worlds, our sci-fi picks spotlight bold concepts with grounded character arcs.',
  Fantasy:
    'Whisk yourself into mythic realms, folklore anthologies, and magic systems that reinvent the genre.',
  Action:
    'Kinetic fight choreography meets sharp storytelling—handpicked series that keep momentum relentless.',
  Drama:
    'Emotionally rich narratives that give life to nuanced relationships, societal commentary, and personal growth.',
  Mystery:
    'Intricate puzzles, investigative noir, and supernatural cases designed for clue hunters.',
  Music:
    'Rhythmic storytelling where the soundtrack shapes the plot—discover series that sound as good as they look.',
  'Slice of Life':
    'Comfort-first storytelling brimming with warmth, human connection, and day-in-the-life escapism.',
  Adventure:
    'Expansive journeys and worldbuilding epics for explorers craving something new each episode.'
};

export default function GenresPage() {
  const genreMap = animeList.reduce<Record<string, typeof animeList>>((acc, anime) => {
    anime.genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(anime);
    });
    return acc;
  }, {});

  const orderedGenres = Object.keys(genreMap).sort((a, b) => a.localeCompare(b));

  return (
    <main className="container">
      <section className={styles.hero}>
        <span className="tag">Browse by mood</span>
        <h1>Genres curated for the way you watch</h1>
        <p>
          Whether you&apos;re chasing pulse-pounding battles or lyrical folklore, Anime Vista maps
          community-backed reviews into thoughtful genre hubs. Start with your vibe, then dive deep
          with toggleable summaries and pros versus cons breakdowns.
        </p>
      </section>

      <section className={styles.genreGrid}>
        {orderedGenres.map((genre) => {
          const entries = genreMap[genre]
            .slice()
            .sort((a, b) => b.communityScore - a.communityScore)
            .slice(0, 4);

          return (
            <article key={genre} className={clsx(styles.card, 'glass-panel')}>
              <header>
                <h2>{genre}</h2>
                <p>{genreDescriptions[genre] ?? 'Curated picks from our community analysts.'}</p>
              </header>
              <ol>
                {entries.map((anime, index) => (
                  <li key={anime.slug}>
                    <span className={styles.rank}>#{index + 1}</span>
                    <div>
                      <Link href={`/anime/${anime.slug}`}>{anime.title}</Link>
                      <p>
                        {anime.season} {anime.year} • {anime.communityScore.toFixed(1)} community
                        score
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <footer>
                <Link href={`/anime/${entries[0]?.slug ?? ''}`} className="button-link">
                  Open featured review
                </Link>
              </footer>
            </article>
          );
        })}
      </section>
    </main>
  );
}
