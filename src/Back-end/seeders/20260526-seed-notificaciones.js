'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('notificaciones', [
      {
        usuario_id: 1,
        tipo: 'recordatorio',
        titulo: 'Expedientes pendientes',
        mensaje: 'Revisa los documentos de empleados cargados durante la inicializacion.',
        metadata: JSON.stringify({ modulo: 'documentos', prioridad: 'media' }),
        leida: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        usuario_id: 4,
        tipo: 'solicitud_aprobada',
        titulo: 'Solicitud aprobada',
        mensaje: 'Tu solicitud de vacaciones fue marcada como aprobada.',
        metadata: JSON.stringify({ solicitud_id: 1 }),
        leida: false,
        createdAt: now,
        updatedAt: now,
      },
      {
        usuario_id: 5,
        tipo: 'recordatorio',
        titulo: 'Registro de asistencia',
        mensaje: 'No olvides revisar el historico de asistencia semanal.',
        metadata: JSON.stringify({ modulo: 'asistencias' }),
        leida: true,
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notificaciones', null, {});
  },
};
