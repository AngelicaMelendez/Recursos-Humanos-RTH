module.exports = (sequelize, DataTypes) => {
  const Incidencia = sequelize.define('Incidencia', {
    empleado_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.ENUM('vacaciones', 'permiso', 'incapacidad', 'maternidad', 'paternidad', 'comision', 'otro') },
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    color: DataTypes.STRING,
    fecha_inicio: DataTypes.DATEONLY,
    fecha_fin: DataTypes.DATEONLY,
    estatus: { type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'), defaultValue: 'aprobado' },
    documento_pdf: DataTypes.STRING,
  }, { tableName: 'incidencias' });

  Incidencia.associate = (models) => {
    Incidencia.belongsTo(models.Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
  };

  return Incidencia;
};
