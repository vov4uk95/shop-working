import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/cart.css'; // підключення стилів

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
              <div>
                <h4>{item.name}</h4>
                <p>{item.price} лв</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)}>Премахни</button>
            </div>
          ))}
          <h3>Обща сума: {getTotal().toFixed(2)} лв</h3>
          <button onClick={handleCheckout}>Плати</button>
        </>
      )}
    </div>
  );
}