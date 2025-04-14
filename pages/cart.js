import { useEffect, useState } from 'react';

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
    <div>
      <h2>Количка</h2>
      {cart.length === 0 ? (
        <p>Количката е празна.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.quantity} бр. - {item.price} лв</li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Плати</button>
        </>
      )}
    </div>
  );
}
