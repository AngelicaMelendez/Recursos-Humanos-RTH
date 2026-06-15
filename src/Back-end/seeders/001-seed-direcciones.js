'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const direccionesUnicas = [
      "Órgano Interno de Control",
      "Dirección de Administración y Finanzas",
      "Dirección de Proyectos Estratégicos",
      "Dirección de Ingeniería",
      "Dirección de Noticias",
      "Dirección de Promoción y Mejora Continua",
      "Dirección de Radio",
      "Dirección de Televisión",
      "Dirección de Vinculación",
      "Dirección General",
      "Dirección Jurídica",
      "Comisionado Subsecretaría de Protección Civil y Gestión de Riesgos",
    ];

    const datosDirecciones = direccionesUnicas.map(nombre => ({
      nombre,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('direcciones', datosDirecciones);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('direcciones', null, {});
  }
};