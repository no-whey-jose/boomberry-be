const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      const error = new HttpError(401, 'Invalid Token.');
      return next(error);
    }
    const decodedToken = jwt.verify(token, 'frábær_leyndarmál_ekki_deila');
    req.userData = { userId: decodedToken.userId }
    next();
  } catch (err) {
    const error = new HttpError(401, 'Invalid Token.');
    return next(error);
  }
};
