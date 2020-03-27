const { Then } = require("cucumber");
const assert = require('assert');

Then('response status code should be {int}', function (statusCode){
  assert.equal(this.response.statusCode, statusCode, 'Expected POST to resolve successfully (status code 200)');
})