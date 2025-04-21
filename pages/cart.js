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
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image || '/no-image.png'} alt={item.name} className="product-image" />
                <div className="product-details">
                  <h3>{item.name}</h3>
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
          </div>

          <div className="cart-summary">
            <h3>Обща сума: {getTotal().toFixed(2)} лв</h3>
            <div className="cart-buttons">
              <button onClick={() => router.push('/')} className="back-btn">Продължи пазаруване</button>
              <button onClick={handleCheckout} className="checkout-btn">Плати</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}