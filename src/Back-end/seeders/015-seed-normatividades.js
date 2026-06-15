'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('normatividades', [
      {
        id: 1,
        nombre: 'Ley de Responsabilidades Administrativas del Estado de Hidalgo',
        tipo: 'Reglamento',
        version: '1.0',
        fecha_publicacion: '2022-08-09',
        estatus: 'activa',
        archivo_pdf: 'uploads/normatividad/Ley de Responsabilidades Administrativas del Estado de Hidalgo.pdf',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        nombre: 'Pobalines',
        tipo: 'Lineamientos',
        version: '1.0',
        fecha_publicacion: '2026-02-27',
        estatus: 'activa',
        archivo_pdf: 'uploads/normatividad/Pobalines.pdf',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('normatividades', null, {});
  },
};
