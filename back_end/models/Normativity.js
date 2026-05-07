import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Normativity extends Model {}

  Normativity.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING(180), allowNull: false },
      tipo: { type: DataTypes.STRING(80), allowNull: false },
      version: { type: DataTypes.STRING(40), allowNull: false },
      fecha_publicacion: { type: DataTypes.DATEONLY, allowNull: false },
      archivo_pdf: { type: DataTypes.STRING(255), allowNull: true },
      estatus: { type: DataTypes.STRING(40), allowNull: false, defaultValue: "activa" }
    },
    {
      sequelize,
      modelName: "Normativity",
      tableName: "normatividad"
    }
  );

  return Normativity;
};

