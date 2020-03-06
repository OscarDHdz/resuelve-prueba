const env = process.env.NODE_ENV || 'develop';

/**
 * If NODE_ENV is set to 'test' or 'develop' we bind process.env with all values set in config.json. 
 * else, we just pick the ones that are currently set externaly in the environment.
 * 
 */
if (env === 'test' || env === 'develop'){
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

}