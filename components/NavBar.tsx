import Link from 'next/link';
import styles from './NavBar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/genres', label: 'Genres' }
];

export function NavBar() {
  return (
    <header className={styles.wrapper}>
      <div className="container">
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <span>Anime</span>
            <span>Vista</span>
          </Link>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/genres" className={styles.cta}>
            Explore Library
          </Link>
        </div>
      </div>
    </header>
  );
}
