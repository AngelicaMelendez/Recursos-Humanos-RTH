module.exports = (sequelize, DataTypes) => {
  const EmpleadoDocumento = sequelize.define('EmpleadoDocumento', {
    empleado_id: { type: DataTypes.INTEGER, allowNull: false },
    tipo_documento: { type: DataTypes.ENUM('INE', 'contrato', 'nombramiento', 'otro') },
    archivo_path: { type: DataTypes.STRING },
    fecha_subida: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, { tableName: 'empleado_documentos' });

  EmpleadoDocumento.associate = (models) => {
    EmpleadoDocumento.belongsTo(models.Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
  };

  return EmpleadoDocumento;
};
