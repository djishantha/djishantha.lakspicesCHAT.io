import express from 'express';
import Stripe from 'stripe';

// Replace with your actual Stripe secret key
const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY');

const app = express();
app.use(express.json());

// Endpoint to create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

// Start server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
