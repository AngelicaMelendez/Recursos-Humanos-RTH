 'use strict';

 /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('departamentos',null,{});
    await queryInterface.sequelize.query('ALTER TABLE `departamentos`  AUTO_INCREMENT = 1;');

    const departamentos = [
      {
        id: 1,
        nombre:"Contraloria Interna",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: "Direccion de Administracion y finanzas",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        nombre: "Planeacion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        nombre: "Archivo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:5,
        nombre: "Contabilidad",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:6,
        nombre: "Finanzas y Contabilidad",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:7,
        nombre: "Teconologias de la Informacion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:8,
        nombre: "Almacen",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:9,
        nombre: "Inventarios",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:10,
        nombre: "Recursos Humanos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:11,
        nombre: "Servicios Generales",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:12,
        nombre: "Direccion de Proyectos Estrategicos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:13,
        nombre: "Direccion de Ingenieria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:14,
        nombre: "Repetidor de Tv.Cerro Juarez",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:15,
        nombre: "Repetidor de Tv.Huejutla",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:16,
        nombre: "Repetidor de Tv.Tepeapulco",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:17,
        nombre: "Repetidor de Tv.Tula",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:18,
        nombre: "Repetidor de Tv.Tulancingo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:19,
        nombre: "Transmisor Cerro Cubitos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:20,
        nombre: "Dirección de Noticias",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:21,
        nombre: "Conductores",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:22,
        nombre: "Camarografo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:23,
        nombre: "Edicion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:24,
        nombre: "Reporteros",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:25,
        nombre: "Direccion de Promocion y Mejora Continua",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:26,
        nombre: "Direccion de Radio",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:27,
        nombre: "Radiodifusora Pachuca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:28,
        nombre: "Tx.Radio Actopan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:29,
        nombre: "Tx.Radiodifusoras de Huejutla AM y FM",
        createdAt: new Date(),
        updatedAt: new Date()  
      },
      {
        id:30,
        nombre: "Radiodifusora Huejutla AM",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:31,
        nombre: "Radiodifusora Jacala",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:32,
        nombre: "Radiodifusora de Tlanchinol",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:33,
        nombre: "Secretaria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:34,
        nombre: "Produccion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:35,
        nombre: "Contenidos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:36,
        nombre: "Audio",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:37,
        nombre: "Camarografo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:38,
        nombre: "Deportes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:39,
        nombre: "Coordinador de Staff",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:40,
        nombre: "Escenografia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:41,
        nombre: "Iluminacion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:42,
        nombre: "Imagen",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:43,
        nombre: "Maquillista",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:44,
        nombre: "Master",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:45,
        nombre: "Switcher",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:46,
        nombre: "Titulador",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:47,
        nombre: "Videoteca",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:48,
        nombre: "Play Out",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:49,
        nombre: "Direccion de Vinculacion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:50,
        nombre: "Direccion General",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:51,
        nombre: "Direccion Juridica",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:52,
        nombre: "Comisionado Subsecretaria de Proteccion Civil y Gestion de Riesgos",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:53,
        nombre: "Archivo y Servicios Generales",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:54,
        nombre: "Coordinador Personal Cerros de Tx",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:55,
        nombre: "Mantenimientos y Tx de Futbol y Eventos Especiales",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:56,
        nombre: "Conductora",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:57,
        nombre: "Escenografo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:58,
        nombre: "Produccion y Conductor",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:59,
        nombre: "Direccion de Television",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:60,
        nombre: "Recepcion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:61,
        nombre: "Direccion de Contraloria",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:62,
        nombre: "Radiodifusora Huejutla FM",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('departamentos', departamentos,{});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departamentos', null, {});
  }
};