const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    empleado_id: { type: DataTypes.INTEGER, unique: true },
    rol: {
  type: DataTypes.STRING(50),
  allowNull: false,
      defaultValue: 'empleado',
    },
    password_hash: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password_hash) {
          usuario.password_hash = await bcrypt.hash(usuario.password_hash, 10);
        }
      },
    },
  });

  Usuario.prototype.validPassword = async function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
  };

  return Usuario;
};
