const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'recursos_humanos_rth',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 30000),
    },
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

module.exports = sequelize;
