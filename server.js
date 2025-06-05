const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allow cross-origin requests. Update the origin as needed, e.g.:
// app.use(cors({ origin: 'https://lostaud.io' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const { name, email, message, link } = req.body;
  if (!name || !email || !link) {
    return res.status(400).json({ error: 'Name, email, and link are required.' });
  }
  const data = { name, email, link, message, date: new Date().toISOString() };
  fs.appendFileSync('submissions.jsonl', JSON.stringify(data) + '\n');
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
