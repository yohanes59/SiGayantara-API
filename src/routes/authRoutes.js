const express = require('express');
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();
const authValidation = [
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// base: v1/auth
router.post('/register', authValidation, authController.register);
router.post('/login', authValidation, authController.login);
router.post('/logout', verifyToken, authController.logout);
router.get('/user', authController.getUser);

module.exports = router;
