'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('empleado_documentos', [
      {
        empleado_id: 1,
        tipo_documento: 'INE',
        archivo_path: 'uploads/documentos/omar-efren/ine.pdf',
        fecha_subida: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 1,
        tipo_documento: 'contrato',
        archivo_path: 'uploads/documentos/omar-efren/contrato.pdf',
        fecha_subida: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 2,
        tipo_documento: 'nombramiento',
        archivo_path: 'uploads/documentos/axel/nombramiento.pdf',
        fecha_subida: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 3,
        tipo_documento: 'otro',
        archivo_path: 'uploads/documentos/angelica/cv.pdf',
        fecha_subida: now,
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleado_documentos', null, {});
  },
};
