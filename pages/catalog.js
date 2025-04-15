import { useState } from 'react';
import { products } from '../utils/products';
import Navbar from '../components/Navbar';

const categories = ['всички', 'комплекти', 'панталони и клинове', 'рокли', 'ризи и блузи'];

export default function Catalog() {
  const [selected, setSelected] = useState('всички');
  const filtered = selected === 'всички' ? products : products.filter(p => p.category === selected);

  return (
    <>
      <Navbar />
      <div className="catalog-container">
        <h1>Каталог</h1>

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
          {filtered.map(product => (
            <div key={product.id} className="product-card">
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
          padding: 40px 20px;
          font-family: 'Playfair Display', serif;
          max-width: 1200px;
          margin: 0 auto;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        .filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .filters button {
          padding: 10px 15px;
          border: 1px solid #ccc;
          background-color: #fff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .filters button.active,
        .filters button:hover {
          background-color: #333;
          color: #fff;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 25px;
        }

        .product-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          padding: 15px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .product-card img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .product-card h3 {
          font-size: 1.1rem;
          margin: 10px 0 5px;
        }

        .product-card p {
          color: #666;
          margin: 0 0 10px;
        }

        .product-card button {
          background-color: #333;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .product-card button:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Добавено в количката!');
}
