'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('solicitudes', [
      {
        id: 1,
        empleado_id: 4,
        tipo: 'vacaciones',
        fecha_inicio: '2026-06-03',
        fecha_fin: '2026-06-07',
        motivo: 'Periodo vacacional programado',
        documento_adjunto: null,
        estatus: 'aprobado',
        aprobado_por: 1,
        fecha_resolucion: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        empleado_id: 2,
        tipo: 'permiso',
        fecha_inicio: '2026-06-12',
        fecha_fin: '2026-06-12',
        motivo: 'Tramite personal',
        documento_adjunto: null,
        estatus: 'pendiente',
        aprobado_por: null,
        fecha_resolucion: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        empleado_id: 5,
        tipo: 'comision',
        fecha_inicio: '2026-06-10',
        fecha_fin: '2026-06-10',
        motivo: 'Cobertura especial',
        documento_adjunto: null,
        estatus: 'aprobado',
        aprobado_por: 1,
        fecha_resolucion: now,
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('solicitudes', null, {});
  },
};
