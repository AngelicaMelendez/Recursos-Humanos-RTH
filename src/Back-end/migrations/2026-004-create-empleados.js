'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empleados', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      curp: {
        type: Sequelize.STRING(18),
        allowNull: true,
        unique: true,
      },

      rfc: {
        type: Sequelize.STRING(13),
        allowNull: true,
      },
      nss: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      grado_de_estudios: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_Sanguineo: {
        type: Sequelize.STRING(3),
        allowNull: true,
      },
      fecha_ingreso: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      tipo_contrato: {
        type: Sequelize.ENUM('honorarios', 'funcionarios', 'confianza', 'base', 'indefinido'),
        allowNull: true,
      },
      estatus: {
        type: Sequelize.ENUM('activo', 'baja'),
        allowNull: false,
        defaultValue: 'activo',
      },
      direccion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'direcciones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'departamentos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      
      puesto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {       // llave foranea
          model: 'puestos', // Nombre real de la tabla en tu base de datos
          key: 'id'         // Columna a la que apunta
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jefe_directo_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Si se borra el jefe directo, el campo queda libre en NULL
      },
      clabe_bancaria: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contacto_nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contacto_parentesco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contacto_telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_baja: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      motivo_baja: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      documento_baja: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('empleados');
  },
};