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
      correo_electronico: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      //-------------------------DOCUMENTOS, SEGURIDAD SOCIAL Y SEGUROS--------------------------------------------//
      curp: {
        type: Sequelize.STRING(18),
        allowNull: true,
        unique: true,
      },
      rfc: {
        type: Sequelize.STRING(13),
        allowNull: true,
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      grado_de_estudios: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      No_de_empleado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nivel: { 
        type: Sequelize.STRING,
        allowNull: true,
      },
      nss: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_imss: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      numero_afiliacion_isste: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unidad_medica_asignada:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      num_poliza_seguro_vida: { //  (OPCIONAL)
        type: Sequelize.STRING,
        allowNull: true,
      },
      num_poliza_seguro_gastos_medicos: { //  (OPCIONAL)
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
        allowNull: true,
        defaultValue: 'activo',
      },
      fecha_ingreso: { //   FECHA DE INGRESO
        type: Sequelize.DATEONLY,
        allowNull: true,
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
      
      puesto_id: {  // CARGO DEL EMPLEADO o ADSCRIPCION DEL EMPLEADO
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {       
          model: 'puestos', 
          key: 'id'         
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jefe_directo_id: { // JEFE INMEDIATO DEL EMPLEADO
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      horario_laboral: {
        type: Sequelize.ENUM('FIJO','NO-FIJO'),
        allowNull: true,
        defaultValue: 'FIJO',
      },
      clabe_bancaria: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alergias: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      enfermedades: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      discapacidad_o_condicion_especial: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      medicamentos_necesarios: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      //------------------- CONTACTOS DE EMERGENCIA -------------------------//
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
      contacto_telefono_alternativo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contacto_direccion:{
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