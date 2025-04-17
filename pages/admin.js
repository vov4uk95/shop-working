<div className="product-list">
          {filtered.map((product, index) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <p>{product.price} лв</p>
                <p><small>{product.category}</small></p>
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(index)}>Редактирай</button>
                <button onClick={() => handleDelete(index)}>Изтрий</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Playfair Display', serif;
        }

        h1, h2 {
          text-align: center;
        }

        .form-section {
          background: #f8f8f8;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 40px;
        }

        .form-section input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .form-section button {
          background-color: #333;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .form-section button:hover {
          background-color: #555;
        }

        .preview {
          max-width: 150px;
          margin-bottom: 10px;
          border-radius: 6px;
        }

        .search-filter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 20px;
        }

        .search-filter input, .search-filter select {
          padding: 10px;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          flex: 1;
        }

        .product-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .product-card {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 12px;
          gap: 20px;
        }

        .product-card img {
          width: 100px;
          height: auto;
          border-radius: 6px;
        }

        .actions button {
          margin-right: 10px;
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .actions button:first-child {
          background-color: #0070f3;
          color: white;
        }

        .actions button:last-child {
          background-color: #e00;
          color: white;
        }
      `}</style>
    </>
  );
}
