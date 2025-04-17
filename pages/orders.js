import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Моите поръчки</h1>
        {orders.length === 0 ? (
          <p className="empty">Нямате направени поръчки.</p>
        ) : (
          <ul className="order-list">
            {orders.map((order, index) => (
              <li key={index} className="order-item">
                <h3>Поръчка #{index + 1}</h3>
                <ul>
                  {order.items.map((item, i) => (
                   <li key={index} className="order-item">
       <h3>Поръчка #{index + 1}</h3>
       <p><strong>Дата:</strong> {order.date}</p>
       <p><strong>Статус:</strong> {order.status}</p>
       <ul>
  {order.items.map((item, i) => (
      <li key={i}>
        {item.name} × {item.quantity} — {item.price} лв
      </li>
    ))}
  </ul>
</li>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 60px auto;
          padding: 20px;
          font-family: 'Playfair Display', serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        .empty {
          text-align: center;
          color: #666;
        }

        .order-list {
          list-style: none;
          padding: 0;
        }

        .order-item {
          border: 1px solid #eee;
          background: #fdfdfd;
          border-radius: 8px;
          margin-bottom: 20px;
          padding: 15px;
        }

        .order-item h3 {
          margin-bottom: 10px;
          color: #333;
        }

        .order-item ul {
          padding-left: 20px;
        }
      `}</style>
    </>
  );
}
