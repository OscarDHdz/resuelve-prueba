const api = require('../../../server');
const request = require('supertest');

const addTeamGoals = async (teamGoals) => {

  const res = await request(api)
    .post('/_api/v1/team-goals')
    .send(teamGoals);

  return res;
}

module.exports = {
  addTeamGoals
}