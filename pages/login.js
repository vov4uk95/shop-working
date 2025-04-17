import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('userEmail');
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Моля, въведете имейл и парола");
      return;
    }

    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
    setLoggedIn(true);

    // опціонально: перенаправляємо на главната страница
    router.push('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setEmail('');
    setPassword('');
    setRole('user');
    setLoggedIn(false);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        {!loggedIn ? (
          <>
            <h1>Вход</h1>
            <input
              type="email"
              placeholder="Имейл"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Парола"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Потребител</option>
              <option value="admin">Администратор</option>
            </select>
            <button onClick={handleLogin}>Вход</button>
          </>
        ) : (
          <div className="welcome">
            <h2>Здравей, {localStorage.getItem('userEmail')}!</h2>
            <p>Тип акаунт: <strong>{localStorage.getItem('userRole')}</strong></p>
            <button onClick={handleLogout}>Изход</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 60px auto;
          padding: 20px;
          text-align: center;
          font-family: 'Playfair Display', serif;
        }

        input, select {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        button {
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }

        button:hover {
          background-color: #555;
        }

        .welcome {
          text-align: center;
        }
      `}</style>
    </>
  );
}
