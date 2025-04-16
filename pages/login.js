import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('userEmail');
    if (user) setLoggedIn(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('userEmail', email);
      setLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {loggedIn ? (
          <div className="welcome">
            <h2>Здравей, {localStorage.getItem('userEmail')}!</h2>
            <button onClick={handleLogout}>Изход</button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="form">
            <h2>Личен кабинет</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Парола"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit">Вход</button>
          </form>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 60px auto;
          font-family: 'Playfair Display', serif;
          text-align: center;
        }

        .form input {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 12px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .form button,
        .welcome button {
          background-color: #333;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .form button:hover,
        .welcome button:hover {
          background-color: #555;
        }
      `}</style>
    </>
  );
}
