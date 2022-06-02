const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const culturalHeritageRoutes = require('./src/routes/culturalHeritageRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    }
    cb("Error: File yang anda kirim tidak valid");
}

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['https://sigayantara-api.herokuapp.com', 'http://localhost:3000']
}));
app.use(express.json());

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/v1/cultural-heritage', culturalHeritageRoutes);
app.use('/v1/auth', authRoutes);

app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message,
        data: error.data,
    });
});

mongoose.connect('mongodb+srv://yohanes:sigayantara@cultureheritage.3mmry.mongodb.net/cultureHeritageDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        app.listen(port, () => console.log(`Connection Success at http://localhost:${port}`));
    })
    .catch(err => console.log(err));
