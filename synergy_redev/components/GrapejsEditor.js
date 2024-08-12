import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

const GrapesJSEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      width: 'auto',
      height: '100vh',
      storageManager: false,
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={editorRef}></div>
    </div>
  );
};

export default GrapesJSEditor;
