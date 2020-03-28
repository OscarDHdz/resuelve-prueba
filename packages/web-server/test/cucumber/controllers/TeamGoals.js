const {app} = require('../../../server');
const request = require('supertest');

const addTeamGoals = async function(teamGoals) {
  const res = await request(app)
    .post('/_api/v1/team-goals')
    .send(teamGoals);

  return res;
}

const updateTeamGoals = async function(teamName, teamGoals) {
  const res = await request(app)
    .put(`/_api/v1/team-goals/${teamName}`)
    .send(teamGoals);

  return res;
}

const getTeamGoalsByTeamName = async function(teamName) {
  const res = await request(app)
  .get(`/_api/v1/team-goals/${teamName}`);
  return res;
}

const deleteTeamGoalsByTeamName = async function(teamName) {
  const res = await request(app)
  .delete(`/_api/v1/team-goals/${teamName}`);
  return res;
}

const addMultipleTeamGoals = async function(teamGoals) {
  const res = await request(app)
    .post('/_api/v1/team-goals/batch')
    .send(teamGoals);

  return res;
}

module.exports = {
  addTeamGoals,
  getTeamGoalsByTeamName,
  updateTeamGoals,
  deleteTeamGoalsByTeamName,
  addMultipleTeamGoals
}