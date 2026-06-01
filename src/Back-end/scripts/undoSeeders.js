const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const seedersPath = path.join(__dirname, '..', 'seeders');
const preferredOrder = [
  '20260526-seed-areas.js',
  '20260526-seed-puestos.js',
  '20260526-seed-empleados.js',
  '20260526-seed-usuarios.js',
];

function getSeederFiles() {
  const seeders = fs
    .readdirSync(seedersPath)
    .filter((file) => /^202\d+.*\.js$/.test(file));

  const ordered = preferredOrder.filter((file) => seeders.includes(file));
  const remaining = seeders
    .filter((file) => !preferredOrder.includes(file))
    .sort();

  return [...ordered, ...remaining].reverse();
}

async function undoSeeders() {
  const queryInterface = sequelize.getQueryInterface();
  const files = getSeederFiles();

  try {
    await sequelize.authenticate();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    for (const file of files) {
      const seeder = require(path.join(seedersPath, file));

      if (typeof seeder.down !== 'function') {
        console.log(`Saltando ${file}: no tiene metodo down.`);
        continue;
      }

      console.log(`Revirtiendo seeder: ${file}`);
      await seeder.down(queryInterface, Sequelize);
    }

    console.log('Seeders revertidos correctamente.');
  } catch (error) {
    console.error('Error al revertir seeders:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;').catch(() => {});
    await sequelize.close();
  }
}

undoSeeders();
