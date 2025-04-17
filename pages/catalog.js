.catalog-container {
          padding: 50px 20px;
          font-family: 'Playfair Display', serif;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .filters button {
          padding: 10px 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background: #fff;
          cursor: pointer;
        }

        .filters button.active,
        .filters button:hover {
          background-color: #333;
          color: #fff;
        }

        .search-sort {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .search-sort input,
        .search-sort select {
          padding: 10px;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          min-width: 200px;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .product-card {
          background: #fff;
          padding: 16px;
          border: 1px solid #eee;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .product-card img {
          width: 100%;
          height: auto;
          border-radius: 6px;
        }

        .product-card h3 {
          margin: 10px 0 5px;
        }

        .product-card button {
          background: #333;
          color: #fff;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          margin-top: 10px;
          font-size: 0.95rem;
          cursor: pointer;
          transform: translateY(20px);
          opacity: 0;
          animation: slideUp 0.5s ease 0.3s forwards;
          transition: transform 0.2s ease;
        }

        .product-card button:hover {
          background-color: #555;
          transform: scale(1.05);
        }

        .spinner-container {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #333;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .zoom-in {
          opacity: 0;
          transform: scale(0.95);
          animation: zoomIn 0.5s ease forwards;
        }

        @keyframes zoomIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

function Toast({ message }) {
  return (
    <div className="toast">
      {message}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #333;
          color: #fff;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          z-index: 9999;
          animation: fadein 0.3s ease, fadeout 0.3s ease 2.2s;
        }

        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeout {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
