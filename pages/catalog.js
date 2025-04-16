import { useState, useEffect } from 'react';
import { products } from '../utils/products';
import Navbar from '../components/Navbar';

const categories = ['всички', 'комплекти', 'панталони и клинове', 'рокли', 'ризи и блузи'];

export default function Catalog() {
  const [selected, setSelected] = useState('всички');
  const [filtered, setFiltered] = useState(products);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const newProducts = selected === 'всички'
      ? products
      : products.filter(p => p.category === selected);

    // Затримка для плавної анімації
    setFiltered([]);
    setTimeout(() => {
      setFiltered(newProducts);
    }, 100);
  }, [selected]);
  
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  setToastMessage('Добавено в количката!');

  setTimeout(() => setToastMessage(''), 2500);
}
  
  return (
    <>
      <Navbar />

      <div className="catalog-container">
        <section className="intro">
          <h1>Новата Колекция</h1>
          <p>Открий стилни визии за всеки ден и специален повод.</p>
        </section>

        <div className="filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={selected === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products">
          {filtered.map((product, index) => (
            <div key={product.id} className="product-card fade-in" style={{ animationDelay: ${index * 100}ms }}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} лв</p>
              <button onClick={() => addToCart(product)}>Добави в количката</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .catalog-container {
          padding: 60px 20px;
          font-family: 'Playfair Display', serif;
          background: linear-gradient(to bottom, #f7f7f7, #fff);
        }

        .intro {
          text-align: center;
          margin-bottom: 40px;
        }

        .intro h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .intro p {
          font-size: 1.2rem;
          color: #666;
        }

        .filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
        }

        .filters button {
          padding: 10px 16px;
          border: 1px solid #ccc;
          background-color: #fff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .filters button.active,
        .filters button:hover {
          background-color: #333;
          color: #fff;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          padding: 15px;
          text-align: center;
          border: 1px solid #eee;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.6s ease forwards;
        }

        .product-card img {
          width: 100%;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .product-card h3 {
          font-size: 1.1rem;
          margin: 8px 0;
        }

        .product-card p {
          color: #555;
          margin-bottom: 10px;
        }

        .product-card button {
          background-color: #333;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
        }

        .product-card button:hover {
          background-color: #555;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
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
        {toastMessage && <Toast message={toastMessage} />}
        @keyframes fadeout {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
