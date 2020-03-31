const jwt = require('jsonwebtoken');
const {HandleError, ERROR_CODES} = require('../utils/ErrorHandler');

const checkAuth = (req, res, next, user) => {
  const token = req.headers['x-auth'];
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.user === user) next();
    else return HandleError(ERROR_CODES[403], res);
  } catch (e) {
    return HandleError(ERROR_CODES[403], res);
  }
}

const checkAdminAuth = (req, res, next) => checkAuth(req, res, next, 'admin')
const checkPublicAuth = (req, res, next) => checkAuth(req, res, next, 'public')


module.exports = {
  checkPublicAuth,
  checkAdminAuth
}