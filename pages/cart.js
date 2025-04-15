import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(item => ({
          price_data: {
            currency: 'bgn',
            product_data: { name: item.name },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }))
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Количка</h1>
        {cart.length === 0 ? (
          <p className="empty">Количката е празна.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <span className="name">{item.name}</span>
                  <span className="quantity">× {item.quantity}</span>
                  <span className="price">{item.price} лв</span>
                </div>
              ))}
            </div>
            <div className="total">
              Общо: <strong>{total.toFixed(2)} лв</strong>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Плати</button>
          </>
        )}
      </div>

      <style jsx>{`
        .cart-container {
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          font-family: 'Playfair Display', serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        .empty {
          text-align: center;
          font-size: 1.2rem;
          color: #666;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          background: #fdfdfd;
          border: 1px solid #eee;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 1rem;
        }

        .cart-item span {
          flex: 1;
        }

        .name {
          font-weight: 500;
        }

        .quantity {
          text-align: center;
        }

        .price {
          text-align: right;
          color: #333;
        }

        .total {
          text-align: right;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .checkout-btn {
          background-color: #333;
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          display: block;
          margin: 0 auto;
          transition: background 0.3s ease;
        }

        .checkout-btn:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
