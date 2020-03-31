const jwt = require('jsonwebtoken');

const generateAuthToken = function (user) {
  var access = 'auth';
  var token = jwt.sign({user: user, access}, 'test@123').toString();
  return token;
};

module.exports = generateAuthToken;