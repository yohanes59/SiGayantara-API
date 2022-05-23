const express = require('express');
const culturalHeritageController = require('../controllers/culturalHeritage');
const { body } = require('express-validator');

const router = express.Router();

const culturalHeritageValidation = [
    body('nama').notEmpty().withMessage('Name is required').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('jenis').notEmpty().withMessage('Jenis is required'),
    body('provinsi').notEmpty().withMessage('Provinsi is required'),
    body('kabupaten').notEmpty().withMessage('Kabupaten is required'),
];

// http://localhost:4000/v1/culturalheritage => post data cagar
router.post('/culturalheritage', culturalHeritageValidation, culturalHeritageController.createCulturalHeritage);

module.exports = router;