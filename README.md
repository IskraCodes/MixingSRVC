# Mixing/Mastering Portal

This project provides a simple portal that can be embedded as a tab on a Shopify site (e.g. `lostaud.io`). Customers can submit a request for mixing or mastering services.

## Running Locally

```bash
npm install
node server.js
```

The portal will be available at `http://localhost:3000`. Customize the port with the `PORT` environment variable if needed.

## Deployment Instructions

1. **Build/Deploy the Node.js server** on your hosting provider.
2. **Create a tab** in your Shopify theme that links to the deployed portal URL.
3. Submitted requests are stored in `submissions.jsonl` in newline-delimited JSON format. You can integrate this with email or your preferred CRM.

## Files

- `server.js` – Express server handling form submissions.
- `public/index.html` – Frontend form that sends POST requests to `/submit`.

Feel free to customize the HTML/CSS or the server logic to integrate emailing or database storage.
