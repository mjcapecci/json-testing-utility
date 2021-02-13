import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Testing Utility</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Test Categories</h1>

        <p className={styles.description}>
          Test cases pulled in from <code className={styles.code}>db.json</code>
        </p>

        <div className={styles.grid}>
          <Link href='/cases/general'>
            <div className={styles.card}>
              <h3>General &rarr;</h3>
            </div>
          </Link>

          <Link href='/cases/landing'>
            <div className={styles.card}>
              <h3>Landing &rarr;</h3>
            </div>
          </Link>

          <Link href='/cases/mapping'>
            <div className={styles.card}>
              <h3>Mapping &rarr;</h3>
            </div>
          </Link>

          <Link href='/cases/verify-import'>
            <div className={styles.card}>
              <h3>Verify Import &rarr;</h3>
            </div>
          </Link>

          <Link href='/cases/upload'>
            <div className={styles.card}>
              <h3>Upload &rarr;</h3>
            </div>
          </Link>

          <Link href='/cases/navbar'>
            <div className={styles.card}>
              <h3>Navbar &rarr;</h3>
            </div>
          </Link>

          <Link href='/cases/settings'>
            <div className={styles.card}>
              <h3>Settings &rarr;</h3>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Frontier Web Development, LLC</p>
      </footer>
    </div>
  );
}
