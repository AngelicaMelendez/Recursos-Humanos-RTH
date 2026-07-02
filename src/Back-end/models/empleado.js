'use strict';

module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: true },
    curp: { type: DataTypes.STRING(18), unique: true, allowNull: true },
    rfc: { type: DataTypes.STRING(13), allowNull: true },
    nss: { type: DataTypes.STRING, allowNull: true },
    grado_de_estudios: { type: DataTypes.STRING, allowNull: true },
    tipo_Sanguineo: { type: DataTypes.STRING(3), allowNull: true },
    fecha_ingreso: { type: DataTypes.DATEONLY, allowNull: true },
    tipo_contrato: { 
      type: DataTypes.ENUM('honorarios', 'funcionarios', 'confianza', 'base', 'indefinido'), 
      allowNull: true 
    },
    estatus: { 
      type: DataTypes.ENUM('activo', 'baja'), 
      allowNull: false,
      defaultValue: 'activo' 
    },
    direccion_id: { type: DataTypes.INTEGER, allowNull: true },
    departamento_id: { type: DataTypes.INTEGER, allowNull: true },
    puesto_id: { type: DataTypes.INTEGER, allowNull: true },
    jefe_directo_id: { type: DataTypes.INTEGER, allowNull: true },
    clabe_bancaria: { type: DataTypes.STRING, allowNull: true },
    contacto_nombre: { type: DataTypes.STRING, allowNull: true },
    contacto_parentesco: { type: DataTypes.STRING, allowNull: true },
    contacto_telefono: { type: DataTypes.STRING, allowNull: true },
    fecha_baja: { type: DataTypes.DATEONLY, allowNull: true },
    motivo_baja: { type: DataTypes.STRING, allowNull: true },     
    documento_baja: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'empleados',
    timestamps: true
  });

  Empleado.associate = (models) => {
    Empleado.belongsTo(models.Direccion, { foreignKey: 'direccion_id', as: 'direccion' });
    Empleado.hasOne(models.Usuario,{foreignKey: 'empleado_id', as: 'usuario'});
    Empleado.belongsTo(models.Departamento, { foreignKey: 'departamento_id', as: 'departamento' });
    Empleado.belongsTo(models.Puesto, { foreignKey: 'puesto_id', as: 'puesto' });
    Empleado.belongsTo(models.Empleado, { foreignKey: 'jefe_directo_id', as: 'jefe' });
    
    // Relaciones secundarias con validación de existencia por seguridad
    if (models.EmpleadoDocumento) Empleado.hasMany(models.EmpleadoDocumento, { foreignKey: 'empleado_id', as: 'documentos' });
    if (models.HistorialPuesto) Empleado.hasMany(models.HistorialPuesto, { foreignKey: 'empleado_id', as: 'historial' });
    if (models.Incidencia) Empleado.hasMany(models.Incidencia, { foreignKey: 'empleado_id', as: 'incidencias' });
    if (models.Solicitud) Empleado.hasMany(models.Solicitud, { foreignKey: 'empleado_id', as: 'solicitudes' });
  };

  return Empleado;
};
