import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="page-transition">
      <Component {...pageProps} />
    </div>
  );
}