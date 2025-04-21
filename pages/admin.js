import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      router.push('/');
    } else {
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(storedOrders);
    }
  }, []);

  const updateStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const deleteOrder = (index) => {
    if (confirm('Сигурни ли сте, че искате да изтриете тази поръчка?')) {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
      <h2>Админ панел — Поръчки</h2>
      {orders.length === 0 ? (
        <p>Няма направени поръчки.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Продукт</th>
              <th style={th}>Количество</th>
              <th style={th}>Цена</th>
              <th style={th}>Дата</th>
              <th style={th}>Статус</th>
              <th style={th}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={td}>{order.name}</td>
                <td style={td}>{order.quantity}</td>
                <td style={td}>{order.price} лв</td>
                <td style={td}>{order.date}</td>
                <td style={td}>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(index, e.target.value)}
                  >
                    <option value="В процес">В процес</option>
                    <option value="Изпратена">Изпратена</option>
                    <option value="Доставена">Доставена</option>
                  </select>
                </td>
                <td style={td}>
                  <button onClick={() => deleteOrder(index)} style={{ color: 'red' }}>
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

const th = {
  border: '1px solid #ddd',
  padding: '12px',
  background: '#f8f8f8',
  textAlign: 'left',
};

const td = {
  border: '1px solid #ddd',
  padding: '12px',
};