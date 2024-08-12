import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GrapesJSEditor from '../components/GrapejsEditor';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GrapesJSEditor />
      </main>
    </>
  );
}
