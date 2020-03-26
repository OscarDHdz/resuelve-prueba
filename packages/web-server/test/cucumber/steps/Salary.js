const { Given, When, Then } = require("cucumber");
const controller = require('../step-definitions/Salary');
const assert = require('assert');

Given('player with data {string}', function (playerData) {
  debugger;
  if (!this.players) {
    this.players = [];
  }

  this.players.push(JSON.parse(playerData));
});

When('players salary is calculated successfully', async function() {
  const playersData = this.players;
  const res = await controller.calculatePlayersSalaries(playersData);

  assert.equal(res.statusCode, 200, 'Expected POST to resolve successfully (status code 200');
});