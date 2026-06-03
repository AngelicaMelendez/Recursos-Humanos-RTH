'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('incidencias', [
      {
        empleado_id: 2,
        tipo: 'permiso',
        titulo: 'Permiso personal',
        descripcion: 'Permiso de medio dia autorizado por Recursos Humanos.',
        color: '#2563eb',
        fecha_inicio: '2026-05-28',
        fecha_fin: '2026-05-28',
        estatus: 'aprobado',
        documento_pdf: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 4,
        tipo: 'vacaciones',
        titulo: 'Periodo vacacional',
        descripcion: 'Solicitud de vacaciones registrada para seguimiento.',
        color: '#16a34a',
        fecha_inicio: '2026-06-03',
        fecha_fin: '2026-06-07',
        estatus: 'pendiente',
        documento_pdf: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 5,
        tipo: 'comision',
        titulo: 'Comision de trabajo',
        descripcion: 'Apoyo operativo en cobertura especial.',
        color: '#f59e0b',
        fecha_inicio: '2026-06-10',
        fecha_fin: '2026-06-10',
        estatus: 'aprobado',
        documento_pdf: null,
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('incidencias', null, {});
  },
};
