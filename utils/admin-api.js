import { getProducts } from './products';

// Додає новий продукт
export const addProduct = (product) => {
  const products = getProducts();
  const updated = [...products, { ...product, id: Date.now() }];
  localStorage.setItem('allProducts', JSON.stringify(updated));
};

// Оновлює існуючий продукт
export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const updated = products.map(p =>
    p.id === updatedProduct.id ? updatedProduct : p
  );
  localStorage.setItem('allProducts', JSON.stringify(updated));
};

// Видаляє продукт за ID
export const deleteProduct = (productId) => {
  const products = getProducts().filter(p => p.id !== productId);
  localStorage.setItem('allProducts', JSON.stringify(products));
};

// Отримує всі продукти
export const getAllProducts = () => {
  return getProducts();
};
