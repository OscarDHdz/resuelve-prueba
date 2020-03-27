const { BeforeAll } = require("cucumber");
require('../../config/configHandler');
const fs = require('fs');

BeforeAll(() => {
  // Cleaning up test db to avoid http 409 codes
  console.info(`Cleaning up test 'db' file...`);
  try {
    fs.unlinkSync(process.env.LOCAL_DB_FILE);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  
});
