import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
      setOrders(storedOrders.filter(o => o.email === storedUser.email));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto' }}>
      <h2>Здравей, {user?.name || user?.email}</h2>
      <button onClick={() => router.push('/')}>Назад към началната</button>
      <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Изход</button>

      <h3 style={{ marginTop: '30px' }}>История на поръчките</h3>
      {orders.length === 0 ? (
        <p>Няма направени поръчки.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr>
              <th>Продукт</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Дата</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.price} лв</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}