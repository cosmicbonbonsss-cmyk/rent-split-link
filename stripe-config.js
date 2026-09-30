/**
 * Test-mode Stripe config for Rent Split Link Pro.
 * Publishable key + Payment Link are safe to expose in the browser.
 * Never put sk_ secret keys here.
 */
window.RSL_STRIPE = {
  publishableKey: 'pk_test_PLACEHOLDER_GET_FROM_DASHBOARD',
  priceId: 'price_1ULBItEt6QpEN31wJkO0KwyE',
  checkoutUrl: 'https://buy.stripe.com/test_6oU5kD3sJ51h8BL3nL4ow00',
  successUrl: 'https://cosmicbonbonsss-cmyk.github.io/rent-split-link/?pro=1',
  cancelUrl: 'https://cosmicbonbonsss-cmyk.github.io/rent-split-link/?upgrade=cancelled'
};
