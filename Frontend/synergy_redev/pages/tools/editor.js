import { useEffect, useState } from 'react';
import Head from 'next/head';
import GrapesJSEditor from '../../components/GrapejsEditor';

export default function Editor() {
  const [isClient, setIsClient] = useState(false);
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetJson = async () => {
    if (isClient) {
      const editor = window.editor;
      if (editor) {
        const htmlContent = editor.getHtml();
        console.log('HTML Content:', htmlContent);

        const name = prompt('Enter the page name:');
        if (name) {
          setPageName(name);

          await fetch('/api/create-page', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pageName: name, htmlContent }),
          });
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Grapes.js Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button onClick={handleGetJson} className={'rounded-md bg-indigo-600 m-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'}>Create Page</button>
        {isClient && <GrapesJSEditor />}
      </main>
    </>
  );
}
