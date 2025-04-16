import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Модерна Дама</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <div className="hero">
        <div className="overlay">
          <h1>Добре дошли в Модерна Дама</h1>
          <p>Стилни визии за жената с вкус.</p>
          <Link href="/catalog" className="cta-btn">Разгледай колекцията</Link>
        </div>
      </div>

      <style jsx>{`
        body {
          margin: 0;
          font-family: 'Playfair Display', serif;
        }

        .hero {
          background-image: url('https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1650&q=80');
          background-size: cover;
          background-position: center;
          height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overlay {
          background: rgba(255, 255, 255, 0.88);
          padding: 40px;
          text-align: center;
          border-radius: 12px;
          max-width: 600px;
        }

        .overlay h1 {
          font-size: 2.7rem;
          margin-bottom: 10px;
          color: #222;
        }

        .overlay p {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #444;
        }

        .cta-btn {
          background-color: #333;
          color: #fff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1.1rem;
          transition: background 0.3s ease;
        }

        .cta-btn:hover {
          background-color: #555;
        }

        @media (max-width: 768px) {
          .overlay {
            padding: 20px;
          }

          .overlay h1 {
            font-size: 2rem;
          }

          .cta-btn {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
