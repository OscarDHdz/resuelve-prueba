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
    JWT_SECRET: 'test@123',
    TOKEN_PUBLIC: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicHVibGljIiwiYWNjZXNzIjoiYXV0aCIsImlhdCI6MTU4NTYyMzUzMH0.nyEizYVQLYzug15bdWdROm3ki2gTnuLsmMONVat07_8',
    TOKEN_ADMIN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTg1NjIzNTMyfQ.Uil0ws_5pinRN174C8flWBgqgXJheKzmx80bh0XCM-0',
  }
}