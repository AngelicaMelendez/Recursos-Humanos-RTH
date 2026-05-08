module.exports = (sequelize, DataTypes) => {
  const HistorialPuesto = sequelize.define('HistorialPuesto', {
    empleado_id: { type: DataTypes.INTEGER, allowNull: false },
    puesto_id: { type: DataTypes.INTEGER },
    fecha_inicio: { type: DataTypes.DATEONLY },
    fecha_fin: { type: DataTypes.DATEONLY },
    motivo_cambio: { type: DataTypes.STRING },
  }, { tableName: 'historial_puestos' });

  HistorialPuesto.associate = (models) => {
    HistorialPuesto.belongsTo(models.Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
    HistorialPuesto.belongsTo(models.Puesto, { foreignKey: 'puesto_id', as: 'puesto' });
  };

  return HistorialPuesto;
};
