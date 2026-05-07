import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Area extends Model {}

  Area.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING(150), allowNull: false },
      area_padre_id: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      sequelize,
      modelName: "Area",
      tableName: "areas"
    }
  );

  return Area;
};

