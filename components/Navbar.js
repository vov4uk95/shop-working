import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header className={showHeader ? '' : 'hide'}>
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)} />}
      <nav className="navbar">
        <div className="nav-left">
          <button className="burger" onClick={toggleMenu}>
            <FaBars />
          </button>
          <span className="menu-text">МЕНЮ</span>
          <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <Link href="/catalog">Каталог</Link>
            {userRole === 'admin' && <Link href="/admin">Админ</Link>}
          </div>
        </div>

        <div className="nav-center">
          <Link href="/" className="logo-link">
            <Image src="/logo.png" alt="Size Logo" width={140} height={60} />
          </Link>
        </div>

        <div className="nav-right">
          <Link href="/login" className="icon-link"><FaUser title="Профил" /></Link>
          <Link href="/cart" className="icon-link"><FaShoppingCart title="Количка" /></Link>
          <Link href="/catalog" className="icon-link"><FaSearch title="Търси" /></Link>
        </div>
      </nav>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          width: 100%;
          background: #f9f9f9;
          z-index: 1000;
          transition: top 0.4s;
        }

        header.hide {
          top: -100px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          z-index: 900;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          font-family: 'Playfair Display', serif;
          position: relative;
          z-index: 1001;
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

        .logo-link {
          text-decoration: none;
        }

        .burger {
          background: none;
          border: none;
          font-size: 26px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .burger:hover {
          transform: scale(1.2);
        }

        .menu-text {
          margin-left: 8px;
          font-size: 16px;
          font-weight: 500;
        }

        .menu {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          background: #fff;
          padding: 0 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s ease, opacity 0.5s ease;
          z-index: 999;
        }

        .menu.open {
          max-height: 200px;
          opacity: 1;
        }

        .menu a {
          text-decoration: none;
          color: #333;
          padding: 10px 0;
          transition: color 0.3s;
        }

        .menu a:hover {
          color: #000;
        }

        .icon-link {
          font-size: 22px;
          color: #333;
          transition: transform 0.3s, color 0.3s;
        }

        .icon-link:hover {
          transform: scale(1.2);
          color: #000;
        }

        @media (min-width: 769px) {
          .menu {
            position: static;
            flex-direction: row;
            max-height: none;
            opacity: 1;
            padding: 0;
            box-shadow: none;
            gap: 20px;
          }
        }
      `}</style>
    </header>
  );
}