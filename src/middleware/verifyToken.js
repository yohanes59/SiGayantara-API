const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
      const cookie = req.cookies['jwt'];
      const claims = jwt.verify(cookie, process.env.SECRET_KEY);
      // console.log(cookie);
      // if (cookie) {
      //   next();
      // } else {
      //   return res.status(403).send({
      //     message: 'Anda tidak memiliki token.',
      //   });
      // }
      // const claims = jwt.verify(cookie, process.env.SECRET_KEY);
  
      if (!claims) {
        return res.status(401).send({
            message: 'token anda tidak valid.'
        });
      }
  
      // const user = await User.findOne({ username: claims.username });
      // const {hash, ...data} = await user.toJSON();
  
      // res.send(data);
    } catch (error) {
      console.log(error);
      return res.status(401).send({
        message: 'Anda tidak memiliki token.',
      });
    }
  }
  
  module.exports = verifyToken; 