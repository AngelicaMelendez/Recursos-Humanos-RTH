const db = require('../models');
const { Op } = require('sequelize');

// Función para calcular estatus de puntualidad (asume entrada a las 8:00 AM)
const calcularEstatusPuntualidad = (horaEntrada) => {
  if (!horaEntrada) return 'ausente';

  const horaEntradaObj = new Date(`1970-01-01 ${horaEntrada}`);
  const horaLimite = new Date(`1970-01-01 08:00:00`);

  if (horaEntradaObj <= horaLimite) {
    return 'a_tiempo';
  }

  return 'retardo';
};

const calcularMinutosRetardo = (horaEntrada) => {
  if (!horaEntrada) return 0;

  const horaEntradaObj = new Date(`1970-01-01 ${horaEntrada}`);
  const horaLimite = new Date(`1970-01-01 08:00:00`);

  if (horaEntradaObj > horaLimite) {
    return Math.round((horaEntradaObj - horaLimite) / 60000);
  }

  return 0;
};

// Realizar Check-in (entrada)
exports.registrarEntrada = async (req, res) => {
  try {
    const empleado_id = req.user.empleado_id;
    const hoy = new Date().toISOString().split('T')[0];
    const horaActual = new Date().toTimeString().split(' ')[0];

    // Verificar si ya tiene registro de entrada hoy
    const asistenciaExistente = await db.Asistencia.findOne({
      where: {
        empleado_id,
        fecha: hoy,
      },
    });

    if (asistenciaExistente && asistenciaExistente.hora_entrada) {
      return res.status(400).json({ error: 'Ya tiene un registro de entrada para hoy' });
    }

    let asistencia;
    const estatusEntrada = calcularEstatusPuntualidad(horaActual);
    const minutosRetardo = calcularMinutosRetardo(horaActual);

    if (asistenciaExistente) {
      await asistenciaExistente.update({
        hora_entrada: horaActual,
        estatus_entrada: estatusEntrada,
        minutos_retardo: minutosRetardo,
      });
      asistencia = asistenciaExistente;
    } else {
      asistencia = await db.Asistencia.create({
        empleado_id,
        fecha: hoy,
        hora_entrada: horaActual,
        estatus_entrada: estatusEntrada,
        minutos_retardo: minutosRetardo,
      });
    }

    res.status(201).json({
      mensaje: `Entrada registrada a las ${horaActual}`,
      estatus: estatusEntrada,
      minutos_retardo: minutosRetardo,
      asistencia,
    });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo registrar entrada', details: error.message });
  }
};

// Realizar Check-out (salida)
exports.registrarSalida = async (req, res) => {
  try {
    const empleado_id = req.user.empleado_id;
    const hoy = new Date().toISOString().split('T')[0];
    const horaActual = new Date().toTimeString().split(' ')[0];

    const asistencia = await db.Asistencia.findOne({
      where: {
        empleado_id,
        fecha: hoy,
      },
    });

    if (!asistencia) {
      return res.status(400).json({ error: 'No hay registro de entrada para hoy' });
    }

    if (asistencia.hora_salida) {
      return res.status(400).json({ error: 'Ya tiene un registro de salida para hoy' });
    }

    // Determinar estatus de salida (asume salida a las 17:00 o 5:00 PM)
    let estatusSalida = 'normal';
    const horaActualObj = new Date(`1970-01-01 ${horaActual}`);
    const horaSalida = new Date(`1970-01-01 17:00:00`);

    if (horaActualObj < horaSalida) {
      estatusSalida = 'temprano';
    } else if (horaActualObj > horaSalida) {
      estatusSalida = 'tarde';
    }

    await asistencia.update({
      hora_salida: horaActual,
      estatus_salida: estatusSalida,
    });

    res.json({
      mensaje: `Salida registrada a las ${horaActual}`,
      estatus_salida: estatusSalida,
      asistencia,
    });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo registrar salida', details: error.message });
  }
};

// Obtener asistencia de un empleado (rango de fechas)
exports.obtenerAsistencia = async (req, res) => {
  try {
    const { empleado_id, fecha_inicio, fecha_fin } = req.query;
    const usuarioActual = req.user;

    // Validar que el usuario tenga permiso
    if (usuarioActual.rol !== 'admin_rh' && usuarioActual.empleado_id !== parseInt(empleado_id)) {
      return res.status(403).json({ error: 'No tienes permiso para ver esta información' });
    }

    const where = { empleado_id };

    if (fecha_inicio && fecha_fin) {
      where.fecha = {
        [Op.between]: [fecha_inicio, fecha_fin],
      };
    }

    const asistencias = await db.Asistencia.findAll({
      where,
      include: [
        {
          model: db.Empleado,
          as: 'empleado',
          attributes: ['id', 'nombre', 'puesto_id'],
          include: [
            {
              model: db.Puesto,
              as: 'puesto',
              attributes: ['id', 'nombre'],
            },
          ],
        },
      ],
      order: [['fecha', 'DESC']],
    });

    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener asistencia', details: error.message });
  }
};

// Obtener asistencia del usuario actual
exports.obtenerMiAsistencia = async (req, res) => {
  try {
    const empleado_id = req.user.empleado_id;
    const { fecha_inicio, fecha_fin } = req.query;

    const where = { empleado_id };

    if (fecha_inicio && fecha_fin) {
      where.fecha = {
        [Op.between]: [fecha_inicio, fecha_fin],
      };
    }

    const asistencias = await db.Asistencia.findAll({
      where,
      order: [['fecha', 'DESC']],
    });

    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener asistencia', details: error.message });
  }
};

// Obtener resumen de asistencia del mes actual (Admin)
exports.obtenerResumenMes = async (req, res) => {
  try {
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1).toISOString().split('T')[0];
    const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).toISOString().split('T')[0];

    const asistencias = await db.Asistencia.findAll({
      where: {
        fecha: {
          [Op.between]: [inicioMes, finMes],
        },
      },
      include: [
        {
          model: db.Empleado,
          as: 'empleado',
          attributes: ['id', 'nombre', 'area_id'],
          include: [
            {
              model: db.Area,
              as: 'area',
              attributes: ['id', 'nombre'],
            },
          ],
        },
      ],
      order: [['fecha', 'DESC']],
    });

    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener resumen', details: error.message });
  }
};
