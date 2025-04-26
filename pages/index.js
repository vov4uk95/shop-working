import Link from 'next/link';

export default function Home() {
  return (
    <div className="home">
      <div className="welcome-section">
        <h1>Добре дошли в <span className="highlight">SIZE</span></h1>
        <p>Открийте най-новата колекция дамски облекла</p>
        <Link href="/catalog">
          <button className="explore-button">Разгледай колекцията</button>
        </Link>
      </div>

      <style jsx>{`
        .home {
          background-image: url('/background.jpg'); /* Фотофон. Додай файл у папку /public */
          background-size: cover;
          background-position: center;
          height: calc(100vh - 80px); /* Віднімаємо висоту шапки */
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .welcome-section {
          background: rgba(255, 255, 255, 0.8);
          padding: 30px;
          border-radius: 12px;
        }

        .highlight {
          color: #000;
          background: #ffd700;
          padding: 5px 10px;
          border-radius: 6px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 30px;
        }

        .explore-button {
          background: #000;
          color: #fff;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .explore-button:hover {
          background: #333;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          p {
            font-size: 1rem;
          }

          .explore-button {
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  );
}