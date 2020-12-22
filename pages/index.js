import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Filmify Shoppies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="/flogo.png" alt="filmify Logo" className={styles.logo} />
        </h1>

        <h2 className={styles.description}>
          The Shoppies
        </h2>

        <div className={styles.grid}>
          <div className={styles.search}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </div>

          <div
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </div>

          <div
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.shopify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brought to you by
          <img src="/logo.png" alt="shopify Logo" className={styles.logo2} />
        </a>
      </footer>
    </div>
  )
}
