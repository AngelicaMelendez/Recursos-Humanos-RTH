const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const db = {};

// 1. Lector automático de carpetas
fs.readdirSync(__dirname)
  .filter(file => {
    return (file !== 'index.js') && (file.endsWith('.js'));
  })
  .forEach(file => {
    try {
      const modelFunc = require(path.join(__dirname, file));
      if (typeof modelFunc === 'function') {
        const model = modelFunc(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      }
    } catch (error) {
      console.error(` Error al cargar archivo automático ${file}:`, error.message);
    }
  });

// ──> 2. INYECCIÓN DE EMERGENCIA FORZADA <──
// Si por alguna razón el bucle de arriba ignoró al empleado, lo metemos a la fuerza aquí:
if (!db.Empleado) {
  try {
    // Forzamos el require directo al archivo del empleado en la misma carpeta
    const empleadoFunc = require('./Empleado.js'); 
    const empleadoModel = empleadoFunc(sequelize, Sequelize.DataTypes);
    db[empleadoModel.name] = empleadoModel;
    console.log(" ¡Modelo Empleado inyectado con éxito mediante carga forzada manual!");
  } catch (err) {
    try {
      // Intento B por si el archivo está en minúsculas en el disco
      const empleadoFunc = require('./empleado.js');
      const empleadoModel = empleadoFunc(sequelize, Sequelize.DataTypes);
      db[empleadoModel.name] = empleadoModel;
      console.log(" ¡Modelo empleado (minúscula) inyectado con éxito mediante carga forzada manual!");
    } catch (err2) {
      console.error("Error crítico: No se pudo forzar la carga de Empleado de ninguna forma:", err2.message);
    }
  }
}

// 3. Sistema de asociaciones protegido
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
    } catch (assocError) {
      console.error(`⚠️ Error en las asociaciones del modelo [${modelName}]:`, assocError.message);
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;