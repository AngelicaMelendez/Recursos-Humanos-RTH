module.exports = (sequelize, DataTypes) => {
  const Solicitud = sequelize.define('Solicitud', {
    empleado_id: DataTypes.INTEGER,
    tipo: DataTypes.STRING, // vacaciones, incapacidad, etc.
    fecha_inicio: DataTypes.DATEONLY,
    fecha_fin: DataTypes.DATEONLY,
    motivo: DataTypes.TEXT,
    documento_adjunto: DataTypes.STRING,
    estatus: { type: DataTypes.ENUM('pendiente', 'aprobado', 'rechazado'), defaultValue: 'pendiente' },
    aprobado_por: DataTypes.INTEGER,
    fecha_resolucion: DataTypes.DATE,
  }, { tableName: 'solicitudes' });

  Solicitud.associate = (models) => {
    Solicitud.belongsTo(models.Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
    Solicitud.belongsTo(models.Empleado, { foreignKey: 'aprobado_por', as: 'aprobador' });
  };

  return Solicitud;
};
