import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'admin123') {
      const adminUser = {
        email,
        role: 'admin',
        name: 'Администратор'
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      router.push('/admin');
    } else {
      alert('Невалидни админ данни!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px' }}>
      <h2>Админ Вход</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={input}
        />

        <label>Парола:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={input}
        />

        <button type="submit">Влез като админ</button>
      </form>
    </div>
  );
}

const input = {
  display: 'block',
  width: '100%',
  marginBottom: '15px',
  padding: '8px',
};