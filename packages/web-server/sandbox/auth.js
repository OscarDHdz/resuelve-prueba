const jwt = require('jsonwebtoken');

const generateAuthToken = function (user) {
  var access = 'auth';
  var token = jwt.sign({user: user, access}, 'test').toString();
  return token;
};

module.exports = generateAuthToken;