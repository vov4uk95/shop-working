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

    const handleRouteChange = () => {
      setIsMenuOpen(false); // автоматично закриваємо меню
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header>
      <div className="top-bar">size</div>
      <nav className="navbar">
        <div className="left">
          <button className="burger" onClick={toggleMenu}>
            <FaBars />
          </button>
          <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <Link href="/">Начало</Link>
            <Link href="/catalog">Каталог</Link>
            {userRole === 'admin' && <Link href="/admin">Админ</Link>}
          </div>
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
          font-family: 'Playfair Display', serif;
        }

        .left {
          display: flex;
          align-items: center;
        }

        .burger {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          margin-right: 10px;
        }

        .menu {
          display: flex;
          gap: 20px;
        }

        .menu a {
          text-decoration: none;
          color: #333;
          transition: color 0.3s ease;
        }

        .menu a:hover {
          color: #000;
        }

        .right {
          display: flex;
          gap: 20px;
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100px;
            left: 0;
            width: 100%;
            background: #f8f8f8;
            padding: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .menu.open {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}