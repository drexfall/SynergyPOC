import '../styles/global.scss';
import '../styles/components.scss';
import Layout from "../components/layout/homeLayout";

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}
