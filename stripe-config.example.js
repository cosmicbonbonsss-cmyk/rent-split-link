/**
 * Copy to stripe-config.js and fill in real values from Stripe Dashboard.
 * stripe-config.js is gitignored — never commit live keys.
 *
 * See docs/STRIPE_SETUP.md for step-by-step Checkout / Payment Link setup.
 */
window.RSL_STRIPE = {
  // pk_test_... from Developers → API keys (Publishable key)
  publishableKey: 'pk_test_PLACEHOLDER_REPLACE_ME',

  // price_... for Product "Rent Split Link Pro" ($5/mo recurring)
  priceId: 'price_PLACEHOLDER_REPLACE_ME',

  /**
   * Prefer a Stripe Payment Link or Checkout Session URL.
   * After payment, redirect back with ?pro=1 so the page sets localStorage.
   * Example success URL: https://YOUR_PAGES_URL/?pro=1
   */
  checkoutUrl: 'https://buy.stripe.com/PLACEHOLDER_REPLACE_ME',

  // Optional: used by the serverless stub when creating Checkout Sessions
  successUrl: 'https://YOUR_GITHUB_PAGES_OR_DOMAIN/?pro=1',
  cancelUrl: 'https://YOUR_GITHUB_PAGES_OR_DOMAIN/?upgrade=cancelled'
};
