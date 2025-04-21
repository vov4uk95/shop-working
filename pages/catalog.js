import { useState, useEffect } from 'react';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockProducts = [
      { id: 1, name: 'Рокля червена', price: 89.99, image: '/images/roklya.jpg' },
      { id: 2, name: 'Комплект лято', price: 109.99, image: '/images/komplekt.jpg' },
      { id: 3, name: 'Панталон класически', price: 69.99, image: '/images/pantalon.jpg' },
    ];
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog-container">
      <h1>Каталог</h1>
      <input
        type="text"
        placeholder="Търсене..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="products">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} лв</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .catalog-container {
          padding: 20px;
        }
        .search-input {
          padding: 10px;
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .products {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .product-card {
          width: 200px;
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 6px;
          text-align: center;
          transition: 0.3s;
        }
        .product-card:hover {
          transform: scale(1.03);
        }
        img {
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}