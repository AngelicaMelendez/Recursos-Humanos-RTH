import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Vacancy extends Model {}

  Vacancy.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      area_id: { type: DataTypes.INTEGER, allowNull: false },
      puesto: { type: DataTypes.STRING(120), allowNull: false },
      tipo_contrato: { type: DataTypes.STRING(80), allowNull: false },
      perfil_requerido: { type: DataTypes.TEXT, allowNull: false },
      fecha_publicacion: { type: DataTypes.DATEONLY, allowNull: false },
      estatus: { type: DataTypes.STRING(40), allowNull: false, defaultValue: "abierta" }
    },
    {
      sequelize,
      modelName: "Vacancy",
      tableName: "vacantes"
    }
  );

  return Vacancy;
};

