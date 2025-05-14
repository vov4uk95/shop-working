import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import products from '../utils/products';

export default function Catalog() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState('');
  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    filterProducts();
  }, [search, sortOrder]);

  const filterProducts = () => {
    let updated = [...products];
    if (search) {
      const lowerSearch = search.toLowerCase();
      updated = updated.filter(product =>
        product.name.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortOrder === 'low') updated.sort((a, b) => a.price - b.price);
    if (sortOrder === 'high') updated.sort((a, b) => b.price - a.price);

    setFilteredProducts(updated);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Добавено в количката!');
  };

  return (
    <div className="catalog-container">
      <h1>Каталог</h1>

      <div className="filters">
        <label>Сортирай по:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Избери</option>
          <option value="low">Цена възходяща</option>
          <option value="high">Цена низходяща</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} лв</p>
              <button onClick={() => addToCart(product)}>Добави в количката</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Няма намерени продукти.</p>
      )}

      <style jsx>{`
        .catalog-container {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .filters {
          margin-bottom: 20px;
        }

        select {
          margin-left: 10px;
          padding: 5px 10px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .product-card {
          background: #fff;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          text-align: center;
          transition: transform 0.3s;
        }

        .product-card:hover {
          transform: scale(1.03);
        }

        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
        }

        .product-card button {
          margin-top: 10px;
          padding: 8px 12px;
          background: black;
          color: white;
          border: none;
          border-radius: 4px;
          transition: 0.3s;
        }

        .product-card button:hover {
          background: #444;
        }

        h1 {
          text-align: center;
          font-size: 28px;
          margin-bottom: 20px;
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </div>
  );
}