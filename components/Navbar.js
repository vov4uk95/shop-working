import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if {typeof window !== 'undefined' && localStorage.getItem('userRole') === 'admin' && (
  <Link href="/admin">
    <span className="icon">⚙️</span> Админ
  </Link>
)}

  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <Link href="/"><span className="icon">🏠</span> Начало</Link>
          <Link href="/catalog"><span className="icon">🛍️</span> Каталог</Link>
          <Link href="/cart"><span className="icon">🛒</span> Количка</Link>
          <Link href="/orders"><span className="icon">📦</span> Моите поръчки</Link>
          <Link href="/login"><span className="icon">👤</span> Личен кабинет</Link>
          {userRole === 'admin' && (
            <Link href="/admin"><span className="icon">⚙️</span> Админ</Link>
          )}
        </div>
        <div className="nav-right">
          {userEmail && (
            <span className="user-info">Здравей, {userEmail}</span>
          )}
        </div>
      </nav>

      <style jsx>{`
        header {
          background-color: #fff;
          border-bottom: 1px solid #eee;
          padding: 10px 0;
        }

        .navbar {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          flex-wrap: wrap;
          font-family: 'Playfair Display', serif;
        }

        .nav-left a {
          margin-right: 20px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-left a:hover {
          color: #000;
        }

        .icon {
          font-size: 1.1rem;
        }

        .user-info {
          font-style: italic;
          color: #555;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-left {
            margin-bottom: 10px;
          }

          .nav-left a {
            margin-right: 12px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </header>
  );
}
