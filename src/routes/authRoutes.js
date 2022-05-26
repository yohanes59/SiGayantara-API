const express = require('express');
const { body } = require('express-validator');
const user = require('../models/user');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const authValidation = [
    body('email').notEmpty().withMessage('Email is required').isLength({ min: 15 }).withMessage('Email must be at least 15 characters long'),
    body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', authValidation, authController.register);
router.post('/login', authValidation, authController.login);
router.post('/logout', verifyToken, authController.logout);
router.get('/user', authController.getUser);
router.get('/alluser', async (req, res) => {
    const users = await user.find();
    res.send({users});
  });

module.exports = router;