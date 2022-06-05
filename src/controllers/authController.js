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

        const { fullName, email, password } = req.body;
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
            fullName,
            email,
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
                res.status(400).json({
                    status: res.statusCode,
                    message: 'All fields are required.'
                })
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: res.statusCode,
            message: 'failed to create an account'
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
            .then(async (result) => {
                const user = result;

                if (!user) {
                    return res.status(400).json({
                        status: res.statusCode,
                        message: 'Email not found.',
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
                    id: user._id,
                    email: user.email,
                }, process.env.SECRET_KEY, {
                    expiresIn: '12h'
                });

                if (process.env.NODE_ENV === 'development') {
                    res.setHeader('Set-Cookie', [`jwt=${token};  Path=/;HttpOnly; maxAge=86400000;SameSite=false;`]);
                } else {
                    res.setHeader('Set-Cookie', [`jwt=${token};  Path=/;HttpOnly; maxAge=86400000;SameSite=None;Secure=true;`]);
                }

                return res.send({
                    token,
                    message: 'login success',
                });
            });
    } catch (error) {
        return res.status(500).json({
            message: 'login failed',
            error,
        });
    }
}

const logout = async (req, res, next) => {
    const token = '';
    res.setHeader('Set-Cookie', [`jwt=${token};  Path=/;HttpOnly; maxAge=0;SameSite=None;Secure=true;`]);

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