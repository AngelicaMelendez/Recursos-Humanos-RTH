import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class User extends Model {}

  User.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      empleado_id: { type: DataTypes.INTEGER, allowNull: true },
      email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      rol: { type: DataTypes.STRING(60), allowNull: false },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      ultimo_acceso: { type: DataTypes.DATE, allowNull: true }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "usuarios"
    }
  );

  return User;
};

