module.exports = (sequelize, DataTypes) => {
  const Vacante = sequelize.define('Vacante', {
    departamento_id: DataTypes.INTEGER,
    puesto: DataTypes.STRING,
    tipo_contrato: DataTypes.STRING,
    perfil_requerido: DataTypes.TEXT,
    fecha_publicacion: DataTypes.DATEONLY,
    estatus: { type: DataTypes.ENUM('abierta', 'cerrada'), defaultValue: 'abierta' },
  }, { tableName: 'vacantes' });

  Vacante.associate = (models) => {
    Vacante.belongsTo(models.Departamento, { foreignKey: 'departamento_id', as: 'departamento' });
  };

  return Vacante;
};
