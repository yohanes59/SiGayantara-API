const express = require('express');
const culturalHeritageRoutes = require('./src/routes/culturalHeritage');
const mongoose = require('mongoose');

const port = 4000;
const app = express();

app.use(express.json());

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
