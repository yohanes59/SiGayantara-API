const express = require('express');
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const culturalHeritageRoutes = require('./src/routes/culturalHeritageRoutes');
const authRoutes = require('./src/routes/authRoutes');
const CONFIG = require('./src/config/config');
require('./src/db/mongoose');

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
    origin: [CONFIG.FE_URL, CONFIG.BE_URL]
}));

app.use(express.json());

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/v1/cultural-heritage', culturalHeritageRoutes);
app.use('/v1/auth', authRoutes);

app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message,
        data: error.data,
    });
});

module.exports = app;