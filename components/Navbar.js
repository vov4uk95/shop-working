import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBars, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserEmail(user.email);
        setUserRole(user.role);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="top-bar">size</div>
      <nav className="navbar">
        <div className="left">
          <button className="burger" onClick={toggleMenu}>
            <FaBars />
          </button>
          <Link href="/catalog">Каталог</Link>
        </div>

        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/">Начало</Link>
          <Link href="/catalog">Каталог</Link>
          {userRole === 'admin' && <Link href="/admin">Админ</Link>}
        </div>

        <div className="right">
          <Link href="/login"><FaUser title="Личен кабинет" /></Link>
          <Link href="/cart"><FaShoppingCart title="Количка" /></Link>
          <Link href="/catalog"><FaSearch title="Търси" /></Link>
        </div>
      </nav>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .top-bar {
          background: #000;
          color: white;
          text-align: center;
          padding: 8px 0;
          font-size: 20px;
          font-weight: bold;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f8f8;
          padding: 10px 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          font-family: 'Playfair Display', serif;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .burger {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .menu {
          display: flex;
          gap: 20px;
          transition: max-height 0.3s ease-in-out;
        }

        .right {
          display: flex;
          gap: 20px;
          font-size: 20px;
        }

        .menu a,
        .left a {
          text-decoration: none;
          color: #333;
          transition: color 0.3s ease;
        }

        .menu a:hover,
        .left a:hover {
          color: #000;
        }

        @media (max-width: 768px) {
          .menu {
            display: ${isMenuOpen ? 'flex' : 'none'};
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            background: #f8f8f8;
            width: 100%;
            padding: 10px 0;
            z-index: 999;
          }
        }
      `}</style>
    </header>
  );
}