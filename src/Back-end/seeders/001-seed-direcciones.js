'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const direcciones = [
      {
        id:1,
        nombre: "Organo Interno de Control",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "Direccion de Administracion y Finanzas",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: "Direccion de Proyectos Estrategicos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: "Direccion de Ingenieria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: "Direccion de Noticias",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        nombre: "Direccion de Promocion y Mejora Continua",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        nombre: "Direccion de Radio",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        nombre: "Direccion de Television",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        nombre: "Direccion de Vinculacion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        nombre: "Direccion General",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        nombre: "Direccion Juridica",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        nombre: "Comisionado Subsecretaría de Protección Civil y Gestión de Riesgos",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]


    await queryInterface.bulkInsert('direcciones', direcciones,{});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('direcciones', null, {});
  }
};