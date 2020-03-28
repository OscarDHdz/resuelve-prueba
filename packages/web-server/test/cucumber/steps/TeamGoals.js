const { Given, When, Then } = require("cucumber");
const controller = require('../controllers/TeamGoals');
const assert = require('assert');

Given('level {string} with minimun goals {int}', function (level, minimunGoals) {
  // Mase sure currentGoals array is declared
  if (!this.currentGoals) {
    this.currentGoals = [];
  }
  this.currentGoals.push({nivel: level, goles_minimos: minimunGoals});
});

Given('team {string} goals are fetched', async function (teamName) {
  // Call GET /team-goals
  const res = await controller.getTeamGoalsByTeamName(teamName);
  this.response = res;
});

Given('team {string} goals are deleted', async function (teamName) {
  // Call DELETE /team-goals
  const res = await controller.deleteTeamGoalsByTeamName(teamName);
  this.response = res;
});

When('goals are set for team {string}', function (teamName) {
  // Make sure there are current goals
  if (!this.currentGoals) {
    throw 'Current Goals have not been set';
  }
  // Make sure teamGoals array is set
  if (!this.teamGoals) {
    this.teamGoals = [];
  }

  this.teamGoals.push(
    {
      equipo: teamName,
      metas: [...this.currentGoals]
    }
  );
  // Clear 
  this.currentGoals = [];
});

Then('{string} team goals are saved', async function(teamName) {
  // Validate data
  if (!this.teamGoals) {
    throw 'There are no team goals set';
  }
  const selectedTeamGoals = this.teamGoals.find(tg => tg.equipo === teamName);
  if (!selectedTeamGoals) {
    throw `There are no goals set for team '${teamName}'`;
  }
  // Call POST /team-goals
  const res = await controller.addTeamGoals(selectedTeamGoals);
  this.response = res;
  // Clean
  this.teamGoals = [];
});

Then('all team goals are saved', async function( ) {
  // Validate data
  if (!this.teamGoals) {
    throw 'There are no team goals set';
  }
  // Call POST /team-goals/batch
  const res = await controller.addMultipleTeamGoals(this.teamGoals);
  this.response = res;
  // Clean
  this.teamGoals = [];
});

Then('{string} team goals are updated', async function(teamName) {
  // Validate data
  if (!this.teamGoals) {
    throw 'There are no team goals set';
  }
  const selectedTeamGoals = this.teamGoals.find(tg => tg.equipo === teamName);
  if (!selectedTeamGoals) {
    throw `There are no goals set for team '${teamName}'`;
  }
  // Call PUT /team-goals}
  const res = await controller.updateTeamGoals(teamName, selectedTeamGoals.metas);
  this.response = res;
  
  // Clean
  this.teamGoals = [];
});

Then('retrieved goals should be from team {string}', function(teamName) {
  const body = this.response.body;
  assert.equal(body.equipo, teamName, `Response did retrieved the expected team goals`);
});

Then('level {string} should have minimun goals {int}', function(level, minimunGoals) {
  const body = this.response.body;
  const goal = body.metas.find(g => g.nivel ===  level);
  if (!goal) {
    throw `Did not find a goal set for level '${level}'`;
  }
  assert.equal(goal.goles_minimos, minimunGoals, `Minimun goals for the given level were no the expected`);
});

Then('respone should contain which team goals failed to be added', function () {
  const body = this.response.body;
  assert(body.failedToAdd !== undefined, `Expcted 'failedToAdd' body value to be defiend`);
});

Then('{string} team goals should have failed due {int} error code', function(teamName, statusCode){
  const body = this.response.body;
  const errorByTeam = body.failedToAdd.find(d => d.data.equipo === teamName);
  if (!errorByTeam) {
    throw `Data from '${teamName}' was not found in 'failedToAdd' info`;
  }
  assert.equal(errorByTeam.error.code, statusCode, `Expcted '${teamName}' data to have failed with code '${statusCode}'`);

});