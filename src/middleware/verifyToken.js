const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, process.env.SECRET_KEY);

    if (!claims) {
      return res.status(401).send({
        message: 'token anda tidak valid.'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: 'Anda tidak memiliki token.',
    });
  }
}

module.exports = verifyToken; 