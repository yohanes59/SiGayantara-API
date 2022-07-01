require('dotenv').config('../.env');

const CONFIG = {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    BE_URL: process.env.BE_URL,
};

module.exports = CONFIG;