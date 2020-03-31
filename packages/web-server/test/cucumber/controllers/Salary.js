const {app} = require('../../../server');
const request = require('supertest');

const token = process.env.TOKEN_PUBLIC;

const calculatePlayersSalaries = async (playersData) => {
  const res = await request(app)
    .post('/_api/v1/salary')
    .send(playersData)
    .set('x-auth', token)
  return res;
}

module.exports = {
  calculatePlayersSalaries
}