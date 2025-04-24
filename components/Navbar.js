import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserEmail(user.email);
      setUserRole(user.role);
    }

    const closeMenu = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', closeMenu);
    return () => router.events.off('routeChangeStart', closeMenu);
  }, [router]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="left">
          <button className="burger" onClick={toggleMenu}>
            <FaBars />
          </button>
          <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <Link href="/catalog">Каталог</Link>
            {userRole === 'admin' && <Link href="/admin">Админ</Link>}
          </div>
        </div>

        <div className="center">
          <Link href="/" className="logo">size</Link>
        </div>

        <div className="right">
          <Link href="/login"><FaUser title="Профил" /></Link>
          <Link href="/cart"><FaShoppingCart title="Количка" /></Link>
          <Link href="/catalog"><FaSearch title="Търси" /></Link>
        </div>
      </nav>

      <style jsx>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #f8f8f8;
          border-bottom: 1px solid #ddd;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 20px;
          font-family: 'Playfair Display', serif;
        }

        .left, .right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .burger {
          font-size: 22px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .menu {
          display: none;
        }

        .menu.open {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          background: #fff;
          padding: 10px 20px;
        }

        .menu a {
          text-decoration: none;
          color: #333;
          padding: 8px 0;
        }

        .menu a:hover {
          color: #000;
        }

        .center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #000;
          text-decoration: none;
          background: #000;
          color: #fff;
          padding: 5px 12px;
          border-radius: 4px;
        }

        .right a {
          font-size: 18px;
          color: #333;
        }

        .right a:hover {
          color: #000;
        }

        @media (max-width: 768px) {
          .right {
            gap: 14px;
          }

          .center .logo {
            font-size: 20px;
            padding: 4px 10px;
          }
        }
      `}</style>
    </header>
  );
}