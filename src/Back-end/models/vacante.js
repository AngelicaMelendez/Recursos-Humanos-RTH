module.exports = (sequelize, DataTypes) => {
  const Vacante = sequelize.define('Vacante', {
    area_id: DataTypes.INTEGER,
    puesto: DataTypes.STRING,
    tipo_contrato: DataTypes.STRING,
    perfil_requerido: DataTypes.TEXT,
    fecha_publicacion: DataTypes.DATEONLY,
    estatus: { type: DataTypes.ENUM('abierta', 'cerrada'), defaultValue: 'abierta' },
  }, { tableName: 'vacantes' });

  Vacante.associate = (models) => {
    Vacante.belongsTo(models.Area, { foreignKey: 'area_id', as: 'area' });
  };

  return Vacante;
};
