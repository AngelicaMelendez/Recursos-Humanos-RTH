const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const seedersPath = path.join(__dirname, '..', 'seeders');
const preferredOrder = [
  '001-seed-direcciones.js',
  '002-seed-departamentos.js',
  '003-seed-puestos.js',
  '004-seed-empleados.js',
  '005-seed-usuarios.js',
  '006-seed-empleado-documentos.js',
  '007-seed-historial-puestos.js',
  '008-seed-asistencias.js',
  '009-seed-comunicados.js',
  '010-seed-incidencias.js',
  '011.seed-solicitudes.js',
  '012-seed-vacantes.js',
  '013-seed-reacciones-comunicados.js',
  '014-seed-notificaciones.js',
  '015-seed-normatividades.js',
  '016-seed-logs.js',
];

const tablesToReport = [
  'direcciones',
  'departamentos',
  'puestos',
  'empleados',
  'usuarios',
  'empleado_documentos',
  'historial_puestos',
  'asistencias',
  'comunicados',
  'incidencias',
  'logs',
  'normatividades',
  'notificaciones',
  'reacciones_comunicados',
  'solicitudes',
  'vacantes',
];

function getSeederFiles() {
  const seeders = fs
    .readdirSync(seedersPath)
    .filter((file) => /^(?:\d{3}|202\d+).*\.js$/.test(file));

  const ordered = preferredOrder.filter((file) => seeders.includes(file));
  const remaining = seeders
    .filter((file) => !preferredOrder.includes(file))
    .sort();

  return [...ordered, ...remaining];
}

async function printTableCounts() {
  console.log('\nResumen de datos sembrados:');

  for (const table of tablesToReport) {
    try {
      const [rows] = await sequelize.query(`SELECT COUNT(*) AS total FROM \`${table}\`;`);
      console.log(`- ${table}: ${rows[0].total}`);
    } catch (error) {
      console.log(`- ${table}: no disponible`);
    }
  }
}

async function runSeeders(options = {}) {
  const { closeConnection = true, setExitCode = true } = options;
  const queryInterface = sequelize.getQueryInterface();
  const files = getSeederFiles();

  try {
    if (typeof sequelize.ensureDatabaseExists === 'function') {
      await sequelize.ensureDatabaseExists();
    }

    await sequelize.authenticate();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    for (const file of files) {
      const seeder = require(path.join(seedersPath, file));

      if (typeof seeder.up !== 'function') {
        console.log(`Saltando ${file}: no tiene metodo up.`);
        continue;
      }

      console.log(`Ejecutando seeder: ${file}`);
      await seeder.up(queryInterface, Sequelize);
    }

    await printTableCounts();
    console.log('Seeders finalizados correctamente.');
  } catch (error) {
    console.error('Error al ejecutar seeders:', error);
    if (setExitCode) {
      process.exitCode = 1;
    }
    throw error;
  } finally {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;').catch(() => {});
    if (closeConnection) {
      await sequelize.close();
    }
  }
}

if (require.main === module) {
  runSeeders().catch(() => {});
}

module.exports = { runSeeders };
