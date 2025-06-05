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

## Converting `index.html` to a Shopify snippet

You can embed the form found in `public/index.html` directly in your Shopify theme.
Create a new snippet named `mixing-request.liquid` and copy the form markup and
script into it. Update the JavaScript `fetch` call to use the full URL of your
hosted Node server:

```javascript
const response = await fetch('https://YOUR-SERVER.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

The Node server must have CORS enabled so Shopify can post to it.
Include the snippet on any page with:

```liquid
{% render 'mixing-request' %}
```

Below is a minimal example of `mixing-request.liquid`:

```liquid
<form id="mixing-request-form">
  <label>Name<input type="text" name="name" required></label>
  <label>Email<input type="email" name="email" required></label>
  <label>Track Link<input type="url" name="link" required></label>
  <label>Message<textarea name="message" rows="4"></textarea></label>
  <button type="submit">Submit</button>
</form>
<p id="mixing-status"></p>
<script>
  const form = document.getElementById('mixing-request-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch('https://YOUR-SERVER.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    const status = document.getElementById('mixing-status');
    if (result.success) {
      status.textContent = 'Request submitted successfully!';
      status.className = 'success';
      form.reset();
    } else {
      status.textContent = result.error || 'Failed to submit.';
      status.className = 'error';
    }
  });
</script>
```

