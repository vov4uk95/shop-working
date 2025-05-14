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
    alert('ÐÐ¾Ð±Ð°Ð²ÐµÐ½Ð¾ Ð² ÐºÐ¾Ð»Ð¸ÑÐºÐ°ÑÐ°!');
  };

  return (
    <div className="catalog-container">
      <h1>ÐÐ°ÑÐ°Ð»Ð¾Ð³</h1>

      <div className="filters">
        <label>Ð¡Ð¾ÑÑÐ¸ÑÐ°Ð¹ Ð¿Ð¾:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">ÐÐ·Ð±ÐµÑÐ¸</option>
          <option value="low">Ð¦ÐµÐ½Ð° Ð²ÑÐ·ÑÐ¾Ð´ÑÑÐ°</option>
          <option value="high">Ð¦ÐµÐ½Ð° Ð½Ð¸Ð·ÑÐ¾Ð´ÑÑÐ°</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} Ð»Ð²</p>
              <button onClick={() => addToCart(product)}>ÐÐ¾Ð±Ð°Ð²Ð¸ Ð² ÐºÐ¾Ð»Ð¸ÑÐºÐ°ÑÐ°</button>
            </div>
          ))}
        </div>
      ) : (
        <p>ÐÑÐ¼Ð° Ð½Ð°Ð¼ÐµÑÐµÐ½Ð¸ Ð¿ÑÐ¾Ð´ÑÐºÑÐ¸.</p>
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