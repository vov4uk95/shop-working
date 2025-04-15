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
            <Link href="/success">Успешна поръчка</Link>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          background-color: #fff;
          border-bottom: 1px solid #ddd;
          padding: 10px 20px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          text-decoration: none;
        }

        .menu a {
          margin-left: 20px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        .menu a:hover {
          color: #0070f3;
        }
      `}</style>
    </>
  );
}
