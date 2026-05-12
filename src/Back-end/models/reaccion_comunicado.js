module.exports = (sequelize, DataTypes) => {
  const ReaccionComunicado = sequelize.define('ReaccionComunicado', {
    comunicado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('like'),
      defaultValue: 'like',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'reacciones_comunicados',
    timestamps: true,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['comunicado_id', 'usuario_id'],
      },
    ],
  });

  ReaccionComunicado.associate = (models) => {
    ReaccionComunicado.belongsTo(models.Comunicado, { foreignKey: 'comunicado_id', as: 'comunicado' });
    ReaccionComunicado.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
  };

  return ReaccionComunicado;
};
