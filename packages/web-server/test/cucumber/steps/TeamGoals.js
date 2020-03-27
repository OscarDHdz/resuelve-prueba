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
      metas: this.currentGoals
    }
  );
});

Then('{string} team goals for team are saved', async function(teamName) {
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
});