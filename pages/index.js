import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Модерна Дама</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />
        <style>{`
          body {
            margin: 0;
            font-family: 'Playfair Display', serif;
            background-color: #f9f9f9;
            color: #333;
          }

          .container {
            text-align: center;
            padding: 80px 20px;
          }

          h1 {
            font-size: 3rem;
            margin-bottom: 20px;
          }

          .links {
            margin-top: 30px;
          }

          .links a {
            margin: 0 15px;
            text-decoration: none;
            color: #333;
            border: 2px solid #ccc;
            padding: 10px 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          .links a:hover {
            background-color: #333;
            color: #fff;
            border-color: #333;
          }
        `}</style>
      </Head>

      <div className="container">
        <h1>Добре дошли в Модерна Дама</h1>
        <div className="links">
          <Link href="/catalog">Виж Каталога</Link>
          <Link href="/cart">Количка</Link>
        </div>
      </div>
    </>
  );
}
