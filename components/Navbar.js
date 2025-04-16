import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserEmail(localStorage.getItem('userEmail') || '');
      setUserRole(localStorage.getItem('userRole') || '');
    }
  }, []);

  return (
    <header>
      <nav className="navbar">
        <Link href="/">Начало</Link>
        <Link href="/catalog">Каталог</Link>
        <Link href="/cart">Количка</Link>
        <Link href="/login">Личен кабинет</Link>
        <Link href="/orders">Моите поръчки</Link>
        {userRole === 'admin' && (
          <Link href="/admin">Админ</Link>
        )}
        {userEmail && (
          <span className="user-info">Здравей, {userEmail}</span>
        )}
      </nav>

      <style jsx>{`
        header {
          background-color: #fff;
          border-bottom: 1px solid #eee;
        }

        .navbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          padding: 12px 20px;
          font-family: 'Playfair Display', serif;
        }

        a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        a:hover {
          color: #000;
        }

        .user-info {
          margin-left: auto;
          font-style: italic;
          color: #555;
        }
      `}</style>
    </header>
  );
}
