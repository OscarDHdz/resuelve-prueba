const {app} = require('../../../server');
const request = require('supertest');

const calculatePlayersSalaries = async (playersData) => {
  const res = await request(app)
    .post('/_api/v1/salary')
    .send(playersData);
  return res;
}

module.exports = {
  calculatePlayersSalaries
}