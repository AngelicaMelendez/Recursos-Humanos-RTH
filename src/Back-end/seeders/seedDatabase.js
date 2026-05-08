const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'seed-data.json');

async function createMissing(Model, rows, options = {}) {
  if (!Array.isArray(rows) || rows.length === 0) return;

  for (const row of rows) {
    const exists = row.id ? await Model.findByPk(row.id) : null;
    if (!exists) {
      await Model.create(row, options);
    }
  }
}

module.exports = async function seedDatabase(db) {
  if (!fs.existsSync(seedPath)) return;

  const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

  await createMissing(db.Area, seed.areas);
  await createMissing(db.Puesto, seed.puestos);
  await createMissing(db.Empleado, seed.empleados);
  await createMissing(db.EmpleadoDocumento, seed.empleado_documentos);
  await createMissing(db.HistorialPuesto, seed.historial_puestos);
  await createMissing(db.Incidencia, seed.incidencias);
  await createMissing(db.Solicitud, seed.solicitudes);
  await createMissing(db.Normatividad, seed.normatividades);
  await createMissing(db.Vacante, seed.vacantes);
  await createMissing(db.Visitante, seed.visitantes);
  await createMissing(db.Log, seed.logs);
  await createMissing(db.Usuario, seed.usuarios);
};
