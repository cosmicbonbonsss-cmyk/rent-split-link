# Stripe setup — Rent Split Link Pro

Draft guide for wiring a **$5/month** Pro subscription. No real secrets belong in this repo.
Use **test mode** until you are ready to charge live.

## 1. Create the product

1. Open [Stripe Dashboard](https://dashboard.stripe.com/) → switch to **Test mode**.
2. **Product catalog** → **Add product**.
3. Name: `Rent Split Link Pro`
4. Description (optional): Custom %, Venmo/Cash App pay links, household save, PDF export, no watermark.
5. Pricing:
   - Price: **$5.00 USD**
   - Billing period: **Monthly** (recurring)
6. Save. Copy the **Price ID** (`price_...`).

## 2. Publishable key (client)

1. **Developers** → **API keys**
2. Copy the **Publishable key** (`pk_test_...`)
3. Put it in `stripe-config.js` as `publishableKey` (file is gitignored; start from `stripe-config.example.js`).

Never put the **Secret key** (`sk_...`) in front-end files or git.

## 3. Checkout options

### Option A — Payment Link (simplest for this static site)

1. **Payment Links** → **New**
2. Select the `Rent Split Link Pro` price ($5/mo).
3. After payment → **Don’t show confirmation page** → redirect to your site with Pro unlock:

   ```
   https://cosmicbonbonsss-cmyk.github.io/rent-split-link/?pro=1
   ```

   (Replace with your real Pages / custom domain URL.)

4. Copy the Payment Link URL (`https://buy.stripe.com/...`) into `stripe-config.js` as `checkoutUrl`.

The page reads `?pro=1` on load, sets `localStorage.rsl_pro = "true"`, and strips the query param. This is a **client-side draft gate**, not server-verified entitlement.

### Option B — Checkout Session (server-created)

Use when you want dynamic success/cancel URLs or Customer Portal later.

1. Deploy a tiny serverless function (see `api/create-checkout-session.example.js`).
2. Set env `STRIPE_SECRET_KEY` to your **test** secret key (hosting provider secrets, never commit).
3. Function creates a Checkout Session with `mode: 'subscription'`, `line_items: [{ price: priceId, quantity: 1 }]`, and:

   - `success_url`: `https://YOUR_SITE/?pro=1`
   - `cancel_url`: `https://YOUR_SITE/?upgrade=cancelled`

4. Point the Upgrade button at your function URL (or have it `fetch` the session and redirect to `session.url`).

## 4. Local config files

| File | Role |
|------|------|
| `stripe-config.example.js` | Committed template with `PLACEHOLDER` values |
| `stripe-config.js` | Local copy (gitignored) — replace placeholders |
| `index.html` | Loads `stripe-config.js`; Upgrade button opens `checkoutUrl` |

```bash
cp stripe-config.example.js stripe-config.js
# edit stripe-config.js with pk_test_..., price_..., and buy.stripe.com/... URL
```

## 5. Unlock behavior (draft)

| Mechanism | Effect |
|-----------|--------|
| `localStorage.rsl_pro === "true"` | Pro UI unlocked |
| `?pro=1` in URL | Sets the flag (Stripe success redirect) |
| `?pro=0` | Clears the flag (dev reset) |

**Important:** Anyone can set `localStorage` or open `?pro=1`. For production you should:

- Verify Checkout / `checkout.session.completed` on a backend
- Issue a signed token or Customer Portal session
- Gate Pro features with that verification

## 6. Webhooks (later — note only)

When you move past the draft gate:

1. **Developers** → **Webhooks** → endpoint e.g. `https://YOUR_API/stripe-webhook`
2. Subscribe at least to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
3. On `checkout.session.completed` / active subscription, mark the customer as Pro in your DB.
4. On cancel / unpaid, revoke Pro.
5. Verify signatures with the webhook signing secret (`whsec_...`) — again, env only, never commit.

This static Pages deploy does **not** implement webhooks yet.

## 7. Replace placeholders checklist

- [ ] Product + $5/mo price created; `priceId` set
- [ ] `publishableKey` = `pk_test_...` (or live `pk_live_...` only when ready)
- [ ] Payment Link or Checkout Session `checkoutUrl` set
- [ ] Success URL ends with `?pro=1` on your real domain
- [ ] Secret key only in serverless env (if using Option B)
- [ ] Webhook endpoint planned before charging real cards
- [ ] Confirm `.gitignore` still excludes `stripe-config.js`

## 8. Test without Stripe

Open the app and append `?pro=1` to unlock Pro locally. Use `?pro=0` to return to Free.
