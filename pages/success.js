import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Success() {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];

      const newOrder = {
        id: Date.now(),
        items: cart,
        date: new Date().toLocaleString('bg-BG'),
        status: 'Обработва се',
        email: localStorage.getItem('userEmail') || ''
      };

      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      setOrderId(newOrder.id);
      localStorage.removeItem('cart');

      // Підготовка для надсилання на email (в майбутньому):
      console.log('Поръчка за изпращане:', newOrder);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="success-container">
        <h1>Благодарим за поръчката!</h1>
        {orderId && <p>Номер на поръчката: <strong>#{orderId}</strong></p>}
        <p>Ще се свържем с вас за потвърждение.</p>
        <a href="/catalog" className="back-link">Обратно към магазина</a>
      </div>

      <style jsx>{`
        .success-container {
          text-align: center;
          margin-top: 80px;
          padding: 30px;
          font-family: 'Playfair Display', serif;
          animation: fadeIn 0.5s ease;
        }

        h1 {
          font-size: 2rem;
          color: #2e7d32;
          margin-bottom: 10px;
        }

        p {
          color: #555;
          font-size: 1.1rem;
          margin-bottom: 15px;
        }

        .back-link {
          display: inline-block;
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
        }

        .back-link:hover {
          background-color: #555;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
