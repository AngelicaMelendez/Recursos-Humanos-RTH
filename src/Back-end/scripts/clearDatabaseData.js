const sequelize = require('../config/database');

const tablesToClear = [
  'areas',
  'asistencias',
  'comunicados',
  'empleado_documentos',
  'empleados',
  'historial_puestos',
  'incidencias',
  'logs',
  'normatividades',
  'notificaciones',
  'puestos',
  'reacciones_comunicados',
  'solicitudes',
  'usuarios',
  'vacantes',
  'visitantes'
];

async function clearDatabaseData() {
  try {
    console.log('Conectando a la base de datos...');
    await sequelize.authenticate();

    console.log('Tablas que se limpiarán:', tablesToClear.join(', '));

    console.log('Desactivando comprobaciones de claves foráneas...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    for (const table of tablesToClear) {
      console.log(`Limpiando tabla: ${table}`);
      await sequelize.query(`TRUNCATE TABLE \`${table}\`;`);
    }

    console.log('Reactivando comprobaciones de claves foráneas...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('Proceso finalizado. Se limpiaron las tablas existentes.');
  } catch (error) {
    console.error('Error al limpiar la base de datos:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

clearDatabaseData();
