import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getProducts } from '../utils/products';

const categories = ['всички', 'комплекти', 'панталони и клинове', 'рокли', 'ризи и блузи', 'връхни дрехи'];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selected, setSelected] = useState('всички');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    const result = products
      .filter(p => {
        const inCategory = selected === 'всички' || p.category === selected;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              p.category.toLowerCase().includes(searchTerm.toLowerCase());
        return inCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'asc') return a.price - b.price;
        if (sortBy === 'desc') return b.price - a.price;
        return 0;
      });
    setFiltered(result);
  }, [products, selected, searchTerm, sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (bottom && visibleCount < filtered.length && !isLoadingMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setVisibleCount(prev => prev + 6);
          setIsLoadingMore(false);
        }, 600);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filtered, visibleCount, isLoadingMore]);

  const addToCart = (product) => {
    if (!product || !product.id) return;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setToastMessage('Добавено в количката!');
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <>
      <Navbar />
      <div className="catalog-container">
        <h1>Каталог</h1>

        <div className="filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={selected === cat ? 'active' : ''}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-sort">
          <input
            type="text"
            placeholder="Търси продукт..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">Без сортиране</option>
            <option value="asc">Най-евтин → най-скъп</option>
            <option value="desc">Най-скъп → най-евтин</option>
          </select>
        </div>

        <div className="products">
          {filtered.slice(0, visibleCount).map((product, index) => (
            <div key={product.id} className="product-card zoom-in" style={{ animationDelay: ${index * 100}ms }}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} лв</p>
              <button onClick={() => addToCart(product)}>Добави в количката</button>
            </div>
          ))}
        </div>

        {isLoadingMore && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {toastMessage && <Toast message={toastMessage} />}
      </div>

      <style jsx>{`
        .catalog-container {
          padding: 50px 20px;
          font-family: 'Playfair Display', serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .filters button {
          padding: 10px 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background: #fff;
          cursor: pointer;
        }

        .filters button.active,
        .filters button:hover {
          background-color: #333;
          color: #fff;
        }

        .search-sort {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .search-sort input,
        .search-sort select {
          padding: 10px;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          min-width: 200px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #fff;
          padding: 16px;
          border: 1px solid #eee;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .product-card img {
          width: 100%;
          height: auto;
          border-radius: 6px;
        }

        .product-card h3 {
          margin: 10px 0 5px;
        }

        .product-card button {
          background: #333;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          margin-top: 10px;
          font-size: 0.95rem;
          cursor: pointer;
          transform: translateY(20px);
          opacity: 0;
          animation: slideUp 0.5s ease 0.3s forwards;
          transition: transform 0.2s ease;
        }

        .product-card button:hover {
          background-color: #555;
          transform: scale(1.05);
        }

        .spinner-container {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #333;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .zoom-in {
          opacity: 0;
          transform: scale(0.95);
          animation: zoomIn 0.5s ease forwards;
        }

        @keyframes zoomIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

function Toast({ message }) {
  return (
    <div className="toast">
      {message}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #333;
          color: #fff;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          z-index: 9999;
          animation: fadein 0.3s ease, fadeout 0.3s ease 2.2s;
        }

        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeout {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
