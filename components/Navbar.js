import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">Модерна Дама</Link>

          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="28" height="28">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className={`menu ${menuOpen ? 'open' : ''}`}>
            <Link href="/catalog">
              <span className="icon">🛍️</span> Каталог
            </Link>
            <Link href="/cart">
              <span className="icon">🛒</span> Количка
            </Link>
            <Link href="/success">
              <span className="icon">✅</span> Поръчка
            </Link>
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
          color: #111;
          text-decoration: none;
        }

        .burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        .menu {
          display: flex;
          gap: 25px;
        }

        .menu a {
          text-decoration: none;
          color: #111;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .icon {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .burger {
            display: block;
          }

          .menu {
            display: ${'none'};
            flex-direction: column;
            width: 100%;
            background: #fff;
            position: absolute;
            top: 100%;
            left: 0;
            padding: 10px 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }

          .menu.open {
            display: flex;
          }

          .menu a {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          }
        }
      `}</style>
    </>
  );
}
