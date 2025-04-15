import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">Модерна Дама</Link>
          <div className="menu">
            <Link href="/catalog">Каталог</Link>
            <Link href="/cart">Количка</Link>
            <Link href="/success">Поръчка</Link>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          background-color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Playfair Display', serif;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: bold;
          color: #222;
          text-decoration: none;
        }

        .menu a {
          margin-left: 25px;
          text-decoration: none;
          color: #333;
          font-size: 1.05rem;
          position: relative;
        }

        .menu a::after {
          content: '';
          display: block;
          width: 0%;
          height: 2px;
          background: #333;
          transition: width 0.3s ease;
          position: absolute;
          bottom: -4px;
          left: 0;
        }

        .menu a:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .nav-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .menu {
            margin-top: 10px;
          }

          .menu a {
            display: block;
            margin: 8px 0;
          }
        }
      `}</style>
    </>
  );
}
