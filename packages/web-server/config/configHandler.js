const env = process.env.NODE_ENV || 'develop';
const fs = require('fs');

/**
 * If NODE_ENV is set to 'test' or 'develop' we bind process.env with all values set in config.json. 
 * else, we just pick the ones that are currently set externaly in the environment.
 * 
 * Currently data is saved in local file. So we make sure that the needed path is set correctly
 * 
 */
if (env === 'test' || env === 'develop'){
  const config = require('./config.js');
  const envConfig = config[env];

  // Bind local configs to process.env
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

  // Prepare path for local "db"
  if (!fs.existsSync(process.env.LOCAL_DB_PATH)) {
    fs.mkdirSync(process.env.LOCAL_DB_PATH);
  }

}