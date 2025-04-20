import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'admin') {
      router.push('/login');
    } else {
      setUser(storedUser);
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(savedOrders);
    }
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  const handleDelete = (index) => {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  if (!user) return null;

  return (
    <div className="orders-container">
      <h2>Админ - Поръчки</h2>
      {orders.length === 0 ? (
        <p>Няма поръчки.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Дата</th>
              <th>Сума</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id || index + 1}</td>
                <td>{order.email}</td>
                <td>{order.date}</td>
                <td>{order.total?.toFixed(2)} лв</td>
                <td>
                  <select
                    value={order.status || 'в процес на обработка'}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="в процес на обработка">в процес на обработка</option>
                    <option value="изпратено">изпратено</option>
                    <option value="доставено">доставено</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(index)} className="delete-btn">
                    Изтрий
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}