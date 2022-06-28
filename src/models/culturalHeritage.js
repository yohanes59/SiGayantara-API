const mongoose = require('mongoose');
const { Schema } = mongoose;

const CulturalheritagePost = new Schema({
    nama: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    cloudinary_id: {
        type: String,
        required: false,
    },
    jenis: {
        type: String,
        required: true,
    },
    provinsi: {
        type: String,
        required: true,
    },
    kabupaten: {
        type: String,
        required: true,
    },
    sejarah: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    author: {
        type: Object,
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cultureheritage', CulturalheritagePost)