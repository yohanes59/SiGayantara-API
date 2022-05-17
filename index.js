const express = require('express');
const culturalHeritageRoutes = require('./src/routes/culturalHeritage');

const port = 4000;
const app = express();

app.use('/v1', culturalHeritageRoutes);

app.listen(port);