const { Given, When, Then } = require("cucumber");
const controller = require('../step-definitions/Salary.stepDefs');

Given('hello world', () => {
  console.log(controller.HelloWorld());
});