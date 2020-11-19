const jwt = require('jsonwebtoken');
const secretKey = require('../constants/token');

module.exports = class Authorization {
  static checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({ success: false, message: 'No token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({ success: false, message: 'Authenticate failed' });
      }

      next();
    });
  };
};
