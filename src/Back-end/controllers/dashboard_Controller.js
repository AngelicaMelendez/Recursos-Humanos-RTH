const db = require('../models');
const { Op } = require('sequelize');


// Pon esto hasta arriba de tu controlador del dashboard, justo abajo de tus imports
console.log("📍 RUTA REAL DEL INDEX DE MODELOS:", require.resolve('../models'));
exports.getStats = async (req, res) => {
  try {
    
    // 1. Empleados Activos y Bajas desde la BD
    console.log("Modelos cargados actualmente en db:", Object.keys(db));
    const totalActivos = await db.Empleado.count({ where: { estatus: 'activo' } });
    const totalEx = await db.Empleado.count({ where: { estatus: 'baja' } });
   
    // 2. Solicitudes Pendientes (Conteo real de tu tabla solicitudes)
    let solicitudesPendientes = 0;
    if (db.Solicitud) {
      solicitudesPendientes = await db.Solicitud.count({
        where: { estatus: 'pendiente' }
      });
    }else {
      console.warn("La tabla 'Solicitud' no existe en la base de datos. Retornando 0 para solicitudes pendientes.");
    }

    // 3. Enviar la respuesta con lo que sí existe
    res.json({
      success: true,
      totalActivos,          // Retorna los 5 de tus seeders
      totalEx,               // Retorna 0
      solicitudesPendientes, // Retorna 1 (Angelica)
      vacantesAbiertas: 0    // Déjalo en 0 estático por ahora si no tienes la tabla
    });

  } catch (error) {
    console.error("Error en getStats:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};