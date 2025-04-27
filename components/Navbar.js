import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <button className="burger" onClick={toggleMenu}>
            <FaBars />
          </button>
          <span className="menu-text">МЕНЮ</span>
          <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <Link href="/catalog">КАТАЛОГ</Link>
            {userRole === 'admin' && <Link href="/admin">Админ</Link>}
          </div>
        </div>

        <div className="nav-center">
          <Link href="/" className="logo-link">
            <Image src="/logo.png" alt="Size Logo" width={200} height={100} />
          </Link>
        </div>

        <div className="nav-right">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Търси..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="search-input"
            />
          </div>
          <Link href="/login"><FaUser title="Профил" /></Link>
          <Link href="/cart"><FaShoppingCart title="Количка" /></Link>
        </div>
      </nav>

      <style jsx>{`
        header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #fff;
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

        .menu-text {
          margin-left: 8px;
          font-size: 16px;
          font-weight: 500;
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

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: #eee;
          border-radius: 20px;
          padding: 5px 10px;
          gap: 8px;
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          width: 120px;
        }

        .search-box:hover {
          background: #ddd;
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

          .search-input {
            width: 70px;
          }
        }
      `}</style>
    </header>
  );
}