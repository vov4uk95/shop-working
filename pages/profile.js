import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
      setNewName(storedUser.name || '');
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const userOrders = savedOrders.filter(order => order.email === storedUser.email);
      setOrders(userOrders);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSave = () => {
    const updatedUser = { ...user, name: newName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
      <h2>Профил</h2>

      {editing ? (
        <>
          <label>Име:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          <button onClick={handleSave}>Запази</button>{' '}
          <button onClick={() => setEditing(false)}>Отказ</button>
        </>
      ) : (
        <>
          <p><strong>Име:</strong> {user.name || '—'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Роля:</strong> {user.role || 'клиент'}</p>
          <button onClick={() => setEditing(true)}>Редактирай</button>{' '}
          <button onClick={handleLogout}>Изход</button>
        </>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h3>Моите поръчки</h3>
      {orders.length === 0 ? (
        <p>Нямате направени поръчки.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>ID</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Дата</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Статус</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Сума</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.id || '—'}</td>
                <td>{order.date || '—'}</td>
                <td>{order.status || 'в процес на обработка'}</td>
                <td>{order.total?.toFixed(2) || '0.00'} лв</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}