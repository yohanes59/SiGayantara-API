const express = require('express');
const culturalHeritageController = require('../controllers/culturalHeritageController');
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
// http://localhost:4000/v1/culturalheritages => get all data cagar
router.get('/culturalheritages', culturalHeritageController.getAllCulturalHeritage);
// http://localhost:4000/v1/culturalheritage/<id> => get by id data cagar
router.get('/culturalheritage/:culturalheritageId', culturalHeritageController.getCulturalHeritageById);
// http://localhost:4000/v1/culturalheritage/<id> => update data cagar
router.put('/culturalheritage/:culturalheritageId', culturalHeritageValidation, culturalHeritageController.updateCulturalHeritage);

router.delete('/culturalheritage/:culturalheritageId', culturalHeritageController.deleteCulturalHeritage);

router.get('/getListOfJenis/', culturalHeritageController.getListOfJenisOfCulturalHeritage);

router.get('/getListOfProvinsi', culturalHeritageController.getListOfProvinsiOfCulturalHeritage);

router.get('/culturalheritage/jenis/:jenis', culturalHeritageController.getCulturalHeritageByJenis);
router.get('/culturalheritage/provinsi/:provinsi', culturalHeritageController.getCulturalHeritageByProvinsi);

module.exports = router;