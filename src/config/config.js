require('dotenv').config('../.env');

const CONFIG = {
    SECRET_KEY: process.env.SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
};

module.exports = CONFIG;