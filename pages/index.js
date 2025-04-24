import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="home-container">
      <div className="search-section">
        <h1>Добре дошли в size</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Търси продукт..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Търси</button>
        </form>
      </div>

      <style jsx>{`
        .home-container {
          padding: 40px 20px;
          text-align: center;
          font-family: 'Playfair Display', serif;
        }

        .search-section {
          background: #f4f4f4;
          padding: 40px 20px;
          border-radius: 8px;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-form {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .search-form input {
          padding: 10px;
          width: 70%;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .search-form button {
          padding: 10px 20px;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .search-form button:hover {
          background-color: #333;
        }
      `}</style>
    </div>
  );
}