module.exports = (sequelize, DataTypes) => {
  const Direccion = sequelize.define('Direccion', {
    nombre: { type: DataTypes.STRING(100), allowNull: false },
  }, {
    tableName: 'direcciones',
  });

  Direccion.associate = (models) => {
    //   Si un Comunicado pertenece a una dirección, la columna 'direccion_id' vive en comunicados.
    if (models.Comunicado) {
      Direccion.hasMany(models.Comunicado, { 
        foreignKey: 'direccion_id', 
        as: 'comunicados' 
      });
    }
    
  };

  return Direccion;
};