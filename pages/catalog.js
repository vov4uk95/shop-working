import { useState } from 'react';
import { products } from '../utils/products';

const categories = ['всички','комплекти','панталони и клинове','рокли','ризи и блузи'];

export default function Catalog() {
  const [selected, setSelected] = useState('всички');
  const filtered = selected === 'всички' ? products : products.filter(p => p.category === selected);

  return (
    <div>
      <h1>Каталог</h1>
      <div style={{ marginBottom: '20px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelected(cat)} style={{
              marginRight: 10, padding: 10,
              backgroundColor: selected === cat ? '#333' : '#ccc',
              color: selected === cat ? '#fff' : '#000'
            }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {filtered.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: 10, width: 200 }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>{product.price} лв</p>
            <button onClick={() => addToCart(product)}>Добави в количката</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Добавено в количката!');
}
