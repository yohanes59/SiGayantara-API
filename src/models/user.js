const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);