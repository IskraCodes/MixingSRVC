const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allow cross-origin requests. Update the origin as needed, e.g.:
// app.use(cors({ origin: 'https://lostaud.io' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir });

app.post('/submit', (req, res) => {
  const { name, email, message, link } = req.body;
  if (!name || !email || !link) {
    return res.status(400).json({ error: 'Name, email, and link are required.' });
  }
  const data = { name, email, link, message, date: new Date().toISOString() };
  fs.appendFileSync('submissions.jsonl', JSON.stringify(data) + '\n');
  res.json({ success: true });
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const info = {
    originalName: req.file.originalname,
    filename: req.file.filename,
    date: new Date().toISOString()
  };
  fs.writeFileSync(path.join(uploadsDir, 'lastUpload.json'), JSON.stringify(info, null, 2));
  res.json({ success: true, ...info });
});

app.get('/latest-upload', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(uploadsDir, 'lastUpload.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.json({});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
