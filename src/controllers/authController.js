const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'Invalid input.',
            })
        }

        const { email, fullName, password } = req.body;
        const userAlready = await User.findOne({ email });
        if (userAlready) {
            return res.status(409).json({
                status: res.statusCode,
                message: 'email already exists.',
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            fullName,
            hash: hashPassword,
        });

        user.save()
            .then(result => {
                res.status(201).json({
                    status: res.statusCode,
                    message: 'Successfully created an account.',
                    data: result,
                });
            })
            .catch(error => {
                res.status(500).json({
                    status: res.statusCode,
                    message: 'Failed to create account, All fields are required.'
                })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: res.statusCode,
            message: 'You failed to create an account, please try again.'
        })
    }
}

const login = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                status: res.statusCode,
                message: 'Invalid input.',
            })
        }
        const { email, password } = req.body;
        await User.findOne({ email })
        .then(async(result) => {
            const user = result;

            if (!user) {
                return res.status(400).json({
                    status: res.statusCode,
                    message: 'User not found.',
                });
            }

            const passwordMatch = await bcrypt.compare(password, user.hash);
            if (!passwordMatch) {
                return res.status(401).json({
                    status: res.statusCode,
                    message: 'Password is incorrect.',
                });
            }

            const token = jwt.sign({ 
                id: user.id,
                email: user.email 
            }, process.env.SECRET_KEY, {
                expiresIn: '1h' 
            });

            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            return res.send({
                message: 'login success',
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'login failed, please try again.'
        });
    }
}

const logout = async (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 0 })

    res.send({
        message: 'logout success'
    })
}

const getUser = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, process.env.SECRET_KEY);

        if (!claims) {
            return res.status(401).send({
                message: 'your token is invalid.'
            });
        }

        const user = await User.findOne({ email: claims.email });
        const { hash, ...data } = await user.toJSON();

        res.send(data);
    } catch (error) {
        return res.status(401).send({
            message: 'You have no tokens.',
        });
    }
}

module.exports = { register, login, logout, getUser };