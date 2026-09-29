# Rent Split Link

A dependency-free rent-split app. Free tier: equal shares, optional amounts already paid, and a shareable URL hash. **Pro** (draft Stripe gate): custom % per roommate, Venmo/Cash App pay links, named household save, PDF/export “who owes whom”, and no free watermark.

No backend required for Free. Pro unlock is currently a **client-side** `localStorage` flag (`rsl_pro`) flipped by Stripe success `?pro=1` — see caveats in `docs/STRIPE_SETUP.md`.

## Open it

- Double-click `index.html`, or open it as a `file://` URL.
- Or from this folder:

  ```bash
  python -m http.server
  ```

  Then open <http://localhost:8000>.

Use **Copy share link** to copy a URL with the current rent, roommates, and payments.

### Try Pro locally (no Stripe)

Append `?pro=1` to unlock. Use `?pro=0` to reset to Free.

## Stripe / Pro (draft)

1. Copy config (gitignored local file):

   ```bash
   cp stripe-config.example.js stripe-config.js
   ```

2. Follow **[docs/STRIPE_SETUP.md](docs/STRIPE_SETUP.md)** to create product **Rent Split Link Pro** at **$5/mo**, a Payment Link or Checkout Session, and replace placeholders.
3. Optional serverless stub: `api/create-checkout-session.example.js` (Netlify / Vercel sketches).

**Never commit** `stripe-config.js` or secret keys. Only `stripe-config.example.js` is tracked.

## GitHub Pages

Repo: [cosmicbonbonsss-cmyk/rent-split-link](https://github.com/cosmicbonbonsss-cmyk/rent-split-link)

Expected Pages URL:

`https://cosmicbonbonsss-cmyk.github.io/rent-split-link/`
