const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Martinez12612',
    database: process.env.DB_NAME || 's_recursos_humanos',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
};
