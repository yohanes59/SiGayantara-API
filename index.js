const express = require('express');
const culturalHeritageRoutes = require('./src/routes/culturalHeritage');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const port = 4000;
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
    if(
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/v1', culturalHeritageRoutes);

app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message,
        data: error.data,
    });
});

mongoose.connect('mongodb+srv://yohanes:sigayantara@cultureheritage.3mmry.mongodb.net/cultureHeritageDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(port, () => console.log('Connection Success'));
})
.catch(err => console.log(err));
