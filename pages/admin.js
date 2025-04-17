import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} from '../utils/admin-api';

export default function AdminPanel() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('всички');
  const categories = ['всички', 'комплекти', 'панталони и клинове', 'рокли', 'ризи и блузи', 'връхни дрехи'];

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      router.replace('/login');
    } else {
      const stored = getAllProducts();
      setProducts(stored);
    }
  }, []);

  const refreshProducts = () => {
    setProducts(getAllProducts());
  };

  const handleAddProduct = () => {
    const product = { ...newProduct, price: parseFloat(newProduct.price) };
    addProduct(product);
    setNewProduct({ name: '', price: '', image: '', category: '' });
    refreshProducts();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewProduct(products[index]);
  };

  const handleSaveEdit = () => {
    updateProduct({ ...newProduct, price: parseFloat(newProduct.price) });
    setEditingIndex(null);
    setNewProduct({ name: '', price: '', image: '', category: '' });
    refreshProducts();
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    refreshProducts();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const filtered = products
    .filter(p =>
      (selectedCategory === 'всички' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Админ Панел</h1>

        <div className="form-section">
          <h2>{editingIndex !== null ? 'Редактирай продукт' : 'Добави нов продукт'}</h2>
          <input
            type="text"
            placeholder="Име"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Цена"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Категория"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {newProduct.image && <img src={newProduct.image} alt="preview" className="preview" />}
          <button onClick={editingIndex !== null ? handleSaveEdit : handleAddProduct}>
            {editingIndex !== null ? 'Запази' : 'Добави'}
          </button>
        </div>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Търси по име или категория..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

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
                <button onClick={() => handleDelete(product.id)}>Изтрий</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* стилізація залишилася така ж, як у попередньому варіанті */
      `}</style>
    </>
  );
}
