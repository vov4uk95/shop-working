import Link from 'next/link';
import { useEffect, useState } from 'react';
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

    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <button className="burger" onClick={toggleMenu}>
            <FaBars />
          </button>
          <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <Link href="/catalog">Каталог</Link>
            {userRole === 'admin' && <Link href="/admin">Админ</Link>}
          </div>
        </div>

        <div className="nav-center">
          <Link href="/" className="site-name">size</Link>
        </div>

        <div className="nav-right">
          <Link href="/login"><FaUser title="Профил" /></Link>
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

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #f9f9f9;
          font-family: 'Playfair Display', serif;
          position: relative;
        }

        .nav-left, .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .site-name {
          font-size: 22px;
          font-weight: bold;
          background: #000;
          color: #fff;
          padding: 4px 12px;
          border-radius: 4px;
          text-decoration: none;
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
        }

        .menu a {
          text-decoration: none;
          color: #333;
          transition: 0.3s;
        }

        .menu a:hover {
          color: #000;
        }

        .nav-right a {
          font-size: 18px;
          color: #333;
          transition: 0.3s;
        }

        .nav-right a:hover {
          color: #000;
        }

        @media (max-width: 768px) {
          .menu {
            display: none;
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            background: #fff;
            padding: 15px;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .menu.open {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}