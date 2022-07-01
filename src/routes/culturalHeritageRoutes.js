const express = require('express');
const culturalHeritageController = require('../controllers/culturalHeritageController');
const { body } = require('express-validator');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const culturalHeritageValidation = [
    body('nama').notEmpty().withMessage('Name is required').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('jenis').notEmpty().withMessage('Jenis is required'),
    body('provinsi').notEmpty().withMessage('Provinsi is required'),
    body('kabupaten').notEmpty().withMessage('Kabupaten is required'),
];
// https://sigayantara-api.herokuapp.com
// base url: /v1/cultural-heritage
router.post('/', [culturalHeritageValidation, verifyToken], culturalHeritageController.createCulturalHeritage); 
router.patch('/:culturalheritageId', [culturalHeritageValidation, verifyToken], culturalHeritageController.updateCulturalHeritage);
router.delete('/:culturalheritageId', verifyToken, culturalHeritageController.deleteCulturalHeritage);
router.get('/', culturalHeritageController.getAllCulturalHeritage);
router.get('/:culturalheritageId', culturalHeritageController.getCulturalHeritageById);

module.exports = router;