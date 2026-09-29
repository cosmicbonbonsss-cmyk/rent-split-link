# Netlify Functions (optional)

Copy the Netlify sketch from `../../api/create-checkout-session.example.js` into
`create-checkout-session.js` here, add `stripe` to your Netlify dependencies,
and set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `SUCCESS_URL`, `CANCEL_URL` in
the Netlify UI. See `docs/STRIPE_SETUP.md`.
