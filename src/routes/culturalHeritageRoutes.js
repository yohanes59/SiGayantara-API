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
// get imageById : v1/images/(<id-nama.format file> ex : 1653456868824-museum wayang.jpg)
router.post('/', culturalHeritageController.createCulturalHeritage); 
router.post('/ct', [culturalHeritageValidation, verifyToken], culturalHeritageController.createCulturalHeritage); 
router.patch('/:culturalheritageId', [culturalHeritageValidation, verifyToken], culturalHeritageController.updateCulturalHeritage);
router.delete('/:culturalheritageId', verifyToken, culturalHeritageController.deleteCulturalHeritage); //
router.get('/', culturalHeritageController.getAllCulturalHeritage); //
router.get('/:culturalheritageId', culturalHeritageController.getCulturalHeritageById); //
router.get('/jenis/getList', culturalHeritageController.getListOfJenisOfCulturalHeritage); //
router.get('/provinsi/getList', culturalHeritageController.getListOfProvinsiOfCulturalHeritage); //

router.get('/jenis/:jenis', culturalHeritageController.getCulturalHeritageByJenis); //
router.get('/provinsi/:provinsi', culturalHeritageController.getCulturalHeritageByProvinsi); //

module.exports = router;