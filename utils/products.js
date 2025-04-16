// utils/products.js

const initialProducts = [
  {
    id: 1,
    name: 'Лятна рокля',
    price: 49,
    image: 'https://via.placeholder.com/300x400?text=Рокля',
    category: 'рокли'
  },
  {
    id: 2,
    name: 'Черен панталон',
    price: 35,
    image: 'https://via.placeholder.com/300x400?text=Панталон',
    category: 'панталони и клинове'
  },
  {
    id: 3,
    name: 'Бяла риза',
    price: 29,
    image: 'https://via.placeholder.com/300x400?text=Риза',
    category: 'ризи и блузи'
  },
  {
    id: 4,
    name: 'Кожено яке',
    price: 89,
    image: 'https://via.placeholder.com/300x400?text=Връхна+дреха',
    category: 'връхни дрехи'
  },
  {
    id: 5,
    name: 'Комплект с пола',
    price: 59,
    image: 'https://via.placeholder.com/300x400?text=Комплект',
    category: 'комплекти'
  },
  {
    id: 6,
    name: 'Клин с висока талия',
    price: 25,
    image: 'https://via.placeholder.com/300x400?text=Клин',
    category: 'панталони и клинове'
  }
];

// Взима всички продукти (от localStorage или началните)
export const getProducts = () => {
  if (typeof window !== 'undefined') {
    const stored = JSON.parse(localStorage.getItem('allProducts'));
    return stored && stored.length > 0 ? stored : initialProducts;
  }
  return initialProducts;
};

// Добавя нов продукт
export const addProduct = (product) => {
  const products = getProducts();
  const updated = [...products, product];
  localStorage.setItem('allProducts', JSON.stringify(updated));
};
