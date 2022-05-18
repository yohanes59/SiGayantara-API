const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const culturalHeritagePost = new Schema({
    nama: {
        type: String,
        required: true,
    },
    jenis: {
        type: String,
        required: true,
    },
    keberadaan: {
        type: Object,
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

module.exports = mongoose.model('CulturalHeritage', culturalHeritagePost)