import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <Link href="/">🏠 Начало</Link>
          <Link href="/catalog">🛍 Каталог</Link>
          <Link href="/cart">🛒 Количка</Link>
        </div>
        <div className="nav-right">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin">⚙️ Админ</Link>
              )}
              <Link href="/profile">👤</Link>
              <button onClick={handleLogout}>Изход</button>
            </>
          ) : (
            <Link href="/login">👤</Link>
          )}
        </div>
      </nav>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          z-index: 1000;
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

        .nav-left a,
        .nav-right a {
          margin-right: 20px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-left a:hover,
        .nav-right a:hover {
          color: #000;
        }

        .nav-right button {
          background: none;
          border: none;
          color: #333;
          font-weight: 500;
          cursor: pointer;
        }

        .nav-right button:hover {
          color: #000;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-left,
          .nav-right {
            margin-bottom: 10px;
          }

          .nav-left a,
          .nav-right a,
          .nav-right button {
            margin-right: 12px;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </header>
  );
}