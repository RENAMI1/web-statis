const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Middleware untuk mengizinkan akses ke folder assets
app.use(express.static('assets'));

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
    destination: './assets/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// API Upload Gambar
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ imageUrl: `/assets/images/${req.file.filename}` });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
