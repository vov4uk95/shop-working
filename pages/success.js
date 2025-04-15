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

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Количка</h2>
        {cart.length === 0 ? (
          <p>Количката е празна.</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} – {item.quantity} бр. – {item.price} лв
                </li>
              ))}
            </ul>
            <button onClick={handleCheckout}>Плати</button>
          </>
        )}
      </div>

      <style jsx>{`
        .cart-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Playfair Display', serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        li {
          background: #f9f9f9;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        button {
          background-color: #333;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }

        button:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
