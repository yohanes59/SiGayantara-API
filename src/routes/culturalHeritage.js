const express = require('express');
const { body } = require('express-validator');
const culturalHeritageController = require('../controllers/culturalHeritage');

const router = express.Router();

router.get('/cultural-heritages', culturalHeritageController.getAllCulturalHeritage);
router.post('/cultural-heritage', [
    body('nama').notEmpty().withMessage('Name is required').isLength({ min: 5 }).withMessage('Name must be at least 30 characters long'),
    body('jenis').notEmpty().withMessage('Jenis is required'),
    body('keberadaan.provinsi').notEmpty().withMessage('Provinsi is required'),
    body('keberadaan.kabupaten').notEmpty().withMessage('Kabupaten is required'),
], culturalHeritageController.createCulturalHeritage);

module.exports = router;