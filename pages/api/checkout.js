import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.line_items, // Очікує поле line_items з frontend
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cart`,
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      console.error('Stripe error:', err.message);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Метод не е позволен');
  }
}
