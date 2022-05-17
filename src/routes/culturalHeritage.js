const express = require('express');
const culturalHeritageController = require('../controllers/culturalHeritage');

const router = express.Router();

router.get('/cultural-heritages', culturalHeritageController.getAllCulturalHeritage);
router.post('/cultural-heritage', culturalHeritageController.createCulturalHeritage);

module.exports = router;