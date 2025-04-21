import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (isRegistering && !name)) {
      alert('Моля, попълнете всички полета.');
      return;
    }

    const role = email === 'admin@example.com' ? 'admin' : 'client';
    const user = { email, password, name, role };

    localStorage.setItem('user', JSON.stringify(user));
    router.push('/profile');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto' }}>
      <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <>
            <label>Име:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </>
        )}
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Парола:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isRegistering ? 'Регистрирай се' : 'Вход'}</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        {isRegistering ? 'Вече имате акаунт?' : 'Нямате акаунт?'}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Вход' : 'Регистрация'}
        </button>
      </p>
    </div>
  );
}