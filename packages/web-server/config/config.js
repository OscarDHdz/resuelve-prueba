const path = require('path');
const LOCAL_DB_PATH = path.join(__dirname, '../db');

module.exports = {
  develop: {
    PORT: 3000,
    UI_DIR: path.join(__dirname, '../../', 'ui/out'),
    LOCAL_DB_PATH,
    LOCAL_DB_FILE: path.join(LOCAL_DB_PATH, 'team_goals.json'),
    JWT_SECRET: 'develop@123'
  },

  test: {
    PORT: 3000,
    UI_DIR: path.join(__dirname, '../../', 'ui/out'),
    LOCAL_DB_PATH,
    LOCAL_DB_FILE: path.join(LOCAL_DB_PATH, 'team_goals_test.json'),
    JWT_SECRET: 'test@123'
  }
}