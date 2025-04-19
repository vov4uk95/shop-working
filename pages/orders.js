import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('userEmail');
      const role = localStorage.getItem('userRole');
      if (!email) {
        router.push('/login');
      } else {
        setUserEmail(email);
        setUserRole(role);
        const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        if (role === 'admin') {
          setOrders(allOrders); // адмін бачить усі замовлення
        } else {
          const userOrders = allOrders.filter(o => o.email === email);
          setOrders(userOrders);
        }
      }
    }
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h1>Моите поръчки</h1>

        {orders.length === 0 ? (
          <p>Нямате направени поръчки.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-card" key={order.id}>
              <h3>Поръчка № {order.id}</h3>
              <p><strong>Имейл:</strong> {order.email}</p>
              <p><strong>Дата:</strong> {order.date}</p>

              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — {item.price} лв
                  </li>
                ))}
              </ul>

              {userRole === 'admin' ? (
                <div className="status-control">
                  <label>Статус:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option>Обработва се</option>
                    <option>Изпратено</option>
                    <option>Доставено</option>
                    <option>Отменено</option>
                  </select>
                </div>
              ) : (
                <p><strong>Статус:</strong> {order.status}</p>
              )}
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .orders-container {
          max-width: 900px;
          margin: 60px auto;
          padding: 0 20px;
          font-family: 'Playfair Display', serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 40px;
        }

        .order-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
          background-color: #fafafa;
        }

        .order-card h3 {
          margin-bottom: 10px;
        }

        .order-card ul {
          margin-top: 10px;
          padding-left: 20px;
        }

        .status-control {
          margin-top: 10px;
        }

        .status-control select {
          margin-left: 10px;
          padding: 6px 12px;
          border-radius: 6px;
        }
      `}</style>
    </>
  );
}
