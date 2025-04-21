import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';

export default function Navbar() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.email) {
        setUserEmail(user.email);
      }
    }
  }, []);

  return (
    <header className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <Link href="/catalog"><FaBars /> Меню</Link>
          <Link href="/catalog">Каталог</Link>
        </div>

        <div className="navbar-center">
          <span className="logo">size</span>
        </div>

        <div className="navbar-right">
          <Link href="/search"><FaSearch /></Link>
          <Link href="/cart"><FaShoppingCart /></Link>
          <Link href="/login"><FaUser /></Link>
        </div>
      </div>

      <style jsx>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .navbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-left,
        .navbar-right {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .navbar-left a,
        .navbar-right a {
          display: flex;
          align-items: center;
          color: #333;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          transition: color 0.3s ease, transform 0.2s ease;
        }

        .navbar-left a:hover,
        .navbar-right a:hover {
          color: #000;
          transform: scale(1.1);
        }

        .navbar-center .logo {
          background: #000;
          color: #fff;
          padding: 8px 20px;
          font-weight: bold;
          font-size: 1.2rem;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: stretch;
          }

          .navbar-center {
            margin: 10px 0;
            text-align: center;
          }
        }
      `}</style>
    </header>
  );
}