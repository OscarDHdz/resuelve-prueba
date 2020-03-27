const { Before, setWorldConstructor, AfterAll } = require("cucumber");
require('../../config/configHandler');
const fs = require('fs');
const {server, app} = require('../../server');

setWorldConstructor(function ({attach, parameters}) {
  this.attach = attach;
  this.parameters = parameters;
  this.server = server;
  this.app = app;
});

Before(function(scenario) {
  console.info(`\n# Scenario: ${scenario.pickle.name}:`);
  // Cleaning up test db to avoid http 409 codes
  try {
    fs.unlinkSync(process.env.LOCAL_DB_FILE);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
});

/**
 * Stop cucumber-js execution by stopping child procceses
 */
AfterAll(function() {
  server.close();
});