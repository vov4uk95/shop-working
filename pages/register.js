import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Моля, попълнете всички полета.');
      return;
    }

    const role = email === 'admin@example.com' ? 'admin' : 'client';

    const newUser = {
      name,
      email,
      role,
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/profile');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '20px' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <label>Име:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '15px' }}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '15px' }}
        />

        <button type="submit">Създай акаунт</button>
      </form>
    </div>
  );
}