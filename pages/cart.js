import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Количката е празна.");
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          line_items: cart.map(item => ({
            price_data: {
              currency: 'bgn',
              product_data: {
                name: item.name
              },
              unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
          }))
        })
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Грешка при обработка на плащане.");
      }
    } catch (error) {
      console.error(error);
      alert("Грешка при свързване със Stripe.");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Количка</h1>

        {cart.length === 0 ? (
          <p>Нямате добавени продукти.</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} × {item.quantity} — {item.price} лв
                </li>
              ))}
            </ul>
            <p><strong>Общо:</strong> {total.toFixed(2)} лв</p>
            <button onClick={handleCheckout}>Плати</button>
          </>
        )}
      </div>

      <style jsx>{`
        .cart-container {
          padding: 40px;
          max-width: 600px;
          margin: 0 auto;
          font-family: 'Playfair Display', serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        li {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }

        button {
          background-color: #333;
          color: white;
          padding: 12px 24px;
          font-size: 1rem;
          border: none;
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
