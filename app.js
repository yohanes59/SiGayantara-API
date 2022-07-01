const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const culturalHeritageRoutes = require('./src/routes/culturalHeritageRoutes');
const authRoutes = require('./src/routes/authRoutes');
const CONFIG = require('./src/config/config');
require('./src/db/mongoose');

dotenv.config();
const app = express();

const fileStorage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        cb(new Error("File type is not supported"), false);
        return;
    }
    cb(null, true);
}

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: [CONFIG.BE_URL, 'http://localhost:3000']
}));

app.use(express.json());

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
// app.use('/v1/images', express.static(path.join(__dirname, 'images')));
app.use('/v1/cultural-heritage', culturalHeritageRoutes);
app.use('/v1/auth', authRoutes);

app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message,
        data: error.data,
    });
});


module.exports = app;