'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('normatividades', [
      {
        nombre: 'Reglamento interno de trabajo',
        tipo: 'Reglamento',
        version: '1.0',
        fecha_publicacion: '2026-05-26',
        estatus: 'activa',
        archivo_pdf: 'uploads/normatividad/reglamento-interno.pdf',
        createdAt: now,
        updatedAt: now,
      },
      {
        nombre: 'Politica de asistencia y puntualidad',
        tipo: 'Politica',
        version: '1.0',
        fecha_publicacion: '2026-05-26',
        estatus: 'activa',
        archivo_pdf: 'uploads/normatividad/asistencia-puntualidad.pdf',
        createdAt: now,
        updatedAt: now,
      },
      {
        nombre: 'Lineamientos para solicitudes de personal',
        tipo: 'Lineamiento',
        version: '1.0',
        fecha_publicacion: '2026-05-26',
        estatus: 'activa',
        archivo_pdf: 'uploads/normatividad/solicitudes-personal.pdf',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('normatividades', null, {});
  },
};
