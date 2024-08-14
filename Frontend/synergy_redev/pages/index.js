import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h2 className={styles.title}>
          <Link href='/tools/editor'>Open editor</Link>
        </h2>
        
      </main>
    </div>
  );
}