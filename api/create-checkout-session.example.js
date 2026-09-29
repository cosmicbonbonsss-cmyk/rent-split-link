/**
 * EXAMPLE ONLY — do not deploy with placeholder secrets.
 *
 * Creates a Stripe Checkout Session for "Rent Split Link Pro" ($5/mo).
 * Adapt for Netlify Functions, Vercel Serverless, Cloudflare Workers, etc.
 *
 * Env (hosting secrets — never commit):
 *   STRIPE_SECRET_KEY=sk_test_...
 *   STRIPE_PRICE_ID=price_...
 *   SUCCESS_URL=https://YOUR_SITE/?pro=1
 *   CANCEL_URL=https://YOUR_SITE/?upgrade=cancelled
 *
 * Netlify: rename/copy to netlify/functions/create-checkout-session.js
 * Vercel:  rename/copy to api/create-checkout-session.js (this path works as a sketch)
 *
 * Client: POST /api/create-checkout-session → { url } → redirect to url
 */

// --- Netlify Functions sketch ---
/*
const Stripe = require('stripe'); // npm i stripe

exports.handler = async function createCheckoutSession(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // sk_test_PLACEHOLDER — use env!
  const priceId = process.env.STRIPE_PRICE_ID || 'price_PLACEHOLDER_REPLACE_ME';
  const successUrl = process.env.SUCCESS_URL || 'https://YOUR_SITE/?pro=1';
  const cancelUrl = process.env.CANCEL_URL || 'https://YOUR_SITE/?upgrade=cancelled';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url, id: session.id })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
*/

// --- Vercel serverless sketch (default export) ---
/*
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // sk_test_PLACEHOLDER — use env!
  const priceId = process.env.STRIPE_PRICE_ID || 'price_PLACEHOLDER_REPLACE_ME';

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: process.env.SUCCESS_URL || 'https://YOUR_SITE/?pro=1',
    cancel_url: process.env.CANCEL_URL || 'https://YOUR_SITE/?upgrade=cancelled'
  });

  res.status(200).json({ url: session.url, id: session.id });
}
*/

// Placeholder module so the file is self-describing if required by accident:
module.exports = {
  note: 'Copy the Netlify or Vercel sketch above into a real function file. Set STRIPE_SECRET_KEY in hosting env. See docs/STRIPE_SETUP.md.'
};
