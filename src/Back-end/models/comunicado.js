module.exports = (sequelize, DataTypes) => {
  const Comunicado = sequelize.define('Comunicado', {
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departamento_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    direccion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('publico', 'privado'),
      defaultValue: 'publico',
    },
    fecha_vencimiento: {
      type: DataTypes.DATEONLY,
    },
    estatus: {
      type: DataTypes.ENUM('activo', 'vencido', 'archivado'),
      defaultValue: 'activo',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'comunicados',
    timestamps: true,
  });

  Comunicado.associate = (models) => {
    Comunicado.belongsTo(models.Departamento, { foreignKey: 'departamento_id', as: 'departamento', allowNull: true });
    Comunicado.belongsTo(models.Direccion, { foreignKey: 'direccion_id', as: 'direccion', allowNull: true });
    Comunicado.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'autor' });
    Comunicado.hasMany(models.ReaccionComunicado, { foreignKey: 'comunicado_id', as: 'reacciones', onDelete: 'CASCADE' });
  };

  return Comunicado;
};
