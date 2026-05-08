module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    curp: { type: DataTypes.STRING(18), unique: true },
    rfc: { type: DataTypes.STRING(13) },
    nss: { type: DataTypes.STRING },
    fecha_ingreso: { type: DataTypes.DATEONLY },
    tipo_contrato: { type: DataTypes.STRING },
    estatus: { type: DataTypes.ENUM('activo', 'baja'), defaultValue: 'activo' },
    direccion: { type: DataTypes.STRING },
    area_id: { type: DataTypes.INTEGER },
    puesto_id: { type: DataTypes.INTEGER },
    jefe_directo_id: { type: DataTypes.INTEGER },
    banco: { type: DataTypes.STRING },
    cuenta: { type: DataTypes.STRING },
    clabe: { type: DataTypes.STRING },
    contacto_nombre: { type: DataTypes.STRING },
    contacto_parentesco: { type: DataTypes.STRING },
    contacto_telefono: { type: DataTypes.STRING },
    fecha_baja: { type: DataTypes.DATEONLY },
    motivo_baja: { type: DataTypes.STRING },
    documento_baja: { type: DataTypes.STRING }, // path al archivo
  }, {
    tableName: 'empleados',
  });

  Empleado.associate = (models) => {
    Empleado.belongsTo(models.Area, { foreignKey: 'area_id', as: 'area' });
    Empleado.belongsTo(models.Puesto, { foreignKey: 'puesto_id', as: 'puesto' });
    Empleado.belongsTo(models.Empleado, { foreignKey: 'jefe_directo_id', as: 'jefe' });
    Empleado.hasMany(models.EmpleadoDocumento, { foreignKey: 'empleado_id', as: 'documentos' });
    Empleado.hasMany(models.HistorialPuesto, { foreignKey: 'empleado_id', as: 'historial' });
    Empleado.hasMany(models.Incidencia, { foreignKey: 'empleado_id', as: 'incidencias' });
    Empleado.hasMany(models.Solicitud, { foreignKey: 'empleado_id', as: 'solicitudes' });
    Empleado.hasOne(models.Usuario, { foreignKey: 'empleado_id', as: 'usuario' });
  };

  return Empleado;
};
