import Navbar from '../components/Navbar';
import '../styles/globals.css'; // Якщо є
import '../styles/cart.css';
import '../styles/orders.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}