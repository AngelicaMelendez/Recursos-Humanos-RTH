'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('vacantes', [
      {
        departamento_id: null,
        puesto: 'Analista de soporte tecnico',
        tipo_contrato: 'indefinido',
        perfil_requerido: 'Experiencia en soporte tecnico, redes y atencion a usuarios.',
        fecha_publicacion: '2026-05-26',
        estatus: 'abierta',
        createdAt: now,
        updatedAt: now,
      },
      {
        departamento_id: null,
        puesto: 'Auxiliar administrativo',
        tipo_contrato: 'temporal',
        perfil_requerido: 'Manejo de archivo, captura de informacion y seguimiento documental.',
        fecha_publicacion: '2026-05-28',
        estatus: 'abierta',
        createdAt: now,
        updatedAt: now,
      },
      {
        departamento_id: null,
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
