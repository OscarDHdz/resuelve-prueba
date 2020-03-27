const { Given, When, Then } = require("cucumber");
const controller = require('../controllers/Salary');
const assert = require('assert');

Given('player with data {string}', function (playerData) {
  // Validate platers arrray is set
  if (!this.players) {
    this.players = [];
  }

  this.players.push(JSON.parse(playerData));
});

When('players salary is calculated', async function() {
  const playersData = this.players;
  const res = await controller.calculatePlayersSalaries(playersData);
  this.response = res;
});

Then('salary response should contain data from {int} players', function(expectedNumPlayers) {
  const body = this.response.body;
  assert(Array.isArray(body), `Response was not an array`);
  assert.equal(body.length, expectedNumPlayers, `Response was not an array`);
});

Then('{string} from {string} team total salary should be {float}', function(playerName, teamName, expectedSalary) {
  const body = this.response.body;
  const playerData = body.find(player => player.nombre === playerName);
  // Validate resposne contains player data
  if (!playerData) {
    throw `Did not find a player with name '${playerName}' from the '${teamName}' team in the response`;
  }
  assert.equal(`${playerData.sueldo_completo}`, `${expectedSalary}`, `Player total salary was not the expected value`);
});