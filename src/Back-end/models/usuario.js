const bcrypt = require('bcryptjs');

const isHashedPassword = (value) => typeof value === 'string' && /^\$2[aby]\$\d{2}\$/.test(value);

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    usuario: { type: DataTypes.STRING(50), allowNull: true},
    empleado_id: { type: DataTypes.INTEGER, allowNull: true },
    rol: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'empleado',
    },
    password_hash: { type: DataTypes.STRING(100), allowNull: false },
  }, {
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        if (typeof usuario.password_hash === 'string' && usuario.password_hash.trim() && !isHashedPassword(usuario.password_hash)) {
          usuario.password_hash = await bcrypt.hash(usuario.password_hash, 10);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('password_hash') && typeof usuario.password_hash === 'string' && usuario.password_hash.trim() && !isHashedPassword(usuario.password_hash)) {
          usuario.password_hash = await bcrypt.hash(usuario.password_hash, 10);
        }
      },
    },
  });

  Usuario.prototype.validPassword = async function (password) {
    if (!password || !this.password_hash) {
      return false;
    }

    return await bcrypt.compare(password, this.password_hash);
  };

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
  };

  return Usuario;
};
