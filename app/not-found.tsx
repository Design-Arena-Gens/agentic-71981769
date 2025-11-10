import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
      <span className="tag">404</span>
      <h1 style={{ marginTop: '1.5rem', fontSize: '2.5rem' }}>The void answered back</h1>
      <p style={{ color: 'var(--muted)', maxWidth: 520, margin: '1rem auto 2rem' }}>
        We couldn&apos;t locate that anime in our community atlas. It might be debuting soon, or
        maybe it slipped into another timeline.
      </p>
      <Link href="/" className="button-link">
        Return home
      </Link>
    </main>
  );
}
