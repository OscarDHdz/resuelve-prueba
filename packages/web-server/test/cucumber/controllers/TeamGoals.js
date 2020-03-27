const {app} = require('../../../server');
const request = require('supertest');

const addTeamGoals = async function(teamGoals) {

  const res = await request(app)
    .post('/_api/v1/team-goals')
    .send(teamGoals);

  return res;
}

module.exports = {
  addTeamGoals
}