const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 's_recursos_humanos',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'Martinez12612',
  {
    host: process.env.DB_HOST || 'localhost',
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
