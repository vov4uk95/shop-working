import Navbar from '../components/Navbar';

export default function Success() {
  return (
    <>
      <Navbar />
      <div className="success-container">
        <h1>Благодарим Ви за поръчката!</h1>
        <p>Ще се свържем с Вас скоро.</p>
      </div>
      
      <style jsx>{`
        .success-container {
          max-width: 600px;
          margin: 100px auto;
          text-align: center;
          font-family: 'Playfair Display', serif;
          color: #333;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        p {
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
}

useEffect(() => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ items: cart, date: new Date().toISOString() });
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
  }
}, []);
