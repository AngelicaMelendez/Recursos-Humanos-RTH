'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('vacantes', [
      {
        area_id: 38,
        puesto: 'Analista de soporte tecnico',
        tipo_contrato: 'indefinido',
        perfil_requerido: 'Experiencia en soporte tecnico, redes y atencion a usuarios.',
        fecha_publicacion: '2026-05-26',
        estatus: 'abierta',
        createdAt: now,
        updatedAt: now,
      },
      {
        area_id: 1,
        puesto: 'Auxiliar administrativo',
        tipo_contrato: 'temporal',
        perfil_requerido: 'Manejo de archivo, captura de informacion y seguimiento documental.',
        fecha_publicacion: '2026-05-28',
        estatus: 'abierta',
        createdAt: now,
        updatedAt: now,
      },
      {
        area_id: 50,
        puesto: 'Productor de contenidos',
        tipo_contrato: 'indefinido',
        perfil_requerido: 'Produccion audiovisual, redaccion y coordinacion de contenidos.',
        fecha_publicacion: '2026-05-20',
        estatus: 'cerrada',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vacantes', null, {});
  },
};
