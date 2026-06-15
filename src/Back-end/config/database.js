const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const databaseName = process.env.DB_NAME || 's_recursos_humanos';
const databaseUser = process.env.DB_USER || 'root';
const databasePassword = process.env.DB_PASSWORD || 'root';
const databaseHost = process.env.DB_HOST || '127.0.0.1';
const databasePort = Number(process.env.DB_PORT || 3306);

const sequelize = new Sequelize(
  databaseName,
  databaseUser,
  databasePassword,
  {
    host: databaseHost,
    port: databasePort,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 30000),
    },
    logging: false,
  }
);

sequelize.ensureDatabaseExists = async function () {
  const adminSequelize = new Sequelize('mysql', databaseUser, databasePassword, {
    host: databaseHost,
    port: databasePort,
    dialect: 'mysql',
    logging: false,
  });

  await adminSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await adminSequelize.close();
};

module.exports = sequelize;
