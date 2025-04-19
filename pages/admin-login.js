import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Простий приклад перевірки адміністратора
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
      router.push('/admin');
    } else {
      alert('Невалидни админ данни');
    }
  };

  return (
    <div className="login-page">
      <h2>Администраторски вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email адрес"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Парола"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Вход като админ</button>
      </form>
    </div>
  );
}
