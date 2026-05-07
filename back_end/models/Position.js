import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Position extends Model {}

  Position.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING(150), allowNull: false },
      nivel: { type: DataTypes.STRING(80), allowNull: false },
      area_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: "Position",
      tableName: "puestos"
    }
  );

  return Position;
};

