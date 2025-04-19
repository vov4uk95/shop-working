import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Простий приклад збереження користувача (роль - клієнт)
    localStorage.setItem('user', JSON.stringify({ email, role: 'client' }));
    router.push('/');
  };

  return (
    <div className="login-page">
      <h2>Вход за клиенти</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email адрес"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Вход</button>
      </form>
    </div>
  );
}
