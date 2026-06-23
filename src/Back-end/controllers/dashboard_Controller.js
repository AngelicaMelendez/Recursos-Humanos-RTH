const db = require('../models');
const { Op } = require('sequelize');

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
      totalActivos,          
      totalEx,               
      solicitudesPendientes, 
      vacantesAbiertas: 0 
    });

  } catch (error) {
    console.error("Error en getStats:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};