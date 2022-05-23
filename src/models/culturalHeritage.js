const mongoose = require('mongoose');
const { Schema } = mongoose;

const CulturalheritagePost = new Schema({
    nama: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
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
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cultureheritage', CulturalheritagePost)