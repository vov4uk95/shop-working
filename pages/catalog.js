import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import products from '../utils/products'; // Імпорт продуктів

export default function Catalog() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(lowerSearch)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search]);

  return (
    <div className="catalog-container">
      <h1>Каталог</h1>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} лв</p>
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