import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (productId, amount) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        line_items: cart.map(item => ({
          price_data: {
            currency: 'bgn',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }))
      })
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="cart-container">
      <h2>Количка</h2>
      {cart.length === 0 ? (
        <p>Вашата количка е празна.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>{item.price} лв</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="remove-btn">Премахни</button>
              </div>
            </div>
          ))}

          <h3>Обща сума: {getTotal().toFixed(2)} лв</h3>
          <div className="cart-actions">
            <button onClick={() => router.push('/')} className="back-btn">Продължи пазаруване</button>
            <button onClick={handleCheckout} className="checkout-btn">Плати</button>
          </div>
        </>
      )}

      <style jsx>{`
        .cart-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Playfair Display', serif;
        }

        .cart-item {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ddd;
          padding: 15px 0;
        }

        .cart-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          margin-right: 20px;
          border-radius: 8px;
        }

        .cart-details {
          flex: 1;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          margin: 10px 0;
        }

        .quantity-controls button {
          background: #f0f0f0;
          border: none;
          padding: 5px 10px;
          font-size: 1rem;
          cursor: pointer;
        }

        .quantity-controls span {
          margin: 0 10px;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #555;
          cursor: pointer;
          font-size: 0.9rem;
          margin-top: 5px;
        }

        .cart-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
        }

        .checkout-btn, .back-btn {

background-color: #333;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 1rem;
        }

        .back-btn {
          background-color: #777;
        }

        .checkout-btn:hover,
        .back-btn:hover {
          opacity: 0.9;
        }

        @media (max-width: 600px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .cart-image {
            width: 80px;
            height: 80px;
            margin-bottom: 10px;
          }

          .cart-actions {
            flex-direction: column;
            gap: 10px;
          }

          .checkout-btn,
          .back-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}