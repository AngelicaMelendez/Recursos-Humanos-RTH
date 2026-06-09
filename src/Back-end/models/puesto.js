module.exports = (sequelize, DataTypes) => {
  const Puesto = sequelize.define('Puesto', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    nivel: { type: DataTypes.STRING(5), allowNull: true }, // opcional para jerarquía
    departamento_id: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: 'puestos' });

  Puesto.associate = (models) => {
    Puesto.belongsTo(models.Departamento, { foreignKey: 'departamento_id', as: 'departamento' });
  };

  return Puesto;
};