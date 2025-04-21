import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('user'));
      setUser(stored);
    }
  }, []);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#fff' }}>
      <nav className="navbar">
        <div className="nav-left">
          <Link href="/">Начало</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/cart">Количка</Link>
          {user?.role === 'admin' && <Link href="/admin">Админ</Link>}
        </div>
        <div className="nav-right">
          <Link href="/login"><span className="icon">👤</span></Link>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          border-bottom: 1px solid #ddd;
          font-family: 'Playfair Display', serif;
        }

        .nav-left a,
        .nav-right a {
          margin-right: 15px;
          text-decoration: none;
          color: #333;
        }

        .icon {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </header>
  );
}