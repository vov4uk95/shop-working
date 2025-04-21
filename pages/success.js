import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || cart.length === 0) return;

    const newOrders = cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      date: new Date().toLocaleDateString('bg-BG'),
      status: 'В процес'
    }));

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = [...existingOrders, ...newOrders];

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    localStorage.removeItem('cart'); // очистити кошик після замовлення
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center' }}>
      <h2>Благодарим ви за поръчката!</h2>
      <p>Ще получите потвърждение по email скоро.</p>
      <button onClick={() => router.push('/')}>Обратно към началната</button>
    </div>
  );
}