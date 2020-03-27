const { Before, AfterAll } = require("cucumber");
require('../../config/configHandler');
const fs = require('fs');

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
 * Stop cucumber-js execution
 */
AfterAll(function() {
  process.exit();
});