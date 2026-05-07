import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Intern extends Model {}

  Intern.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING(150), allowNull: false },
      institucion: { type: DataTypes.STRING(150), allowNull: false },
      carrera: { type: DataTypes.STRING(120), allowNull: false },
      periodo_inicio: { type: DataTypes.DATEONLY, allowNull: false },
      periodo_fin: { type: DataTypes.DATEONLY, allowNull: false },
      area_asignada: { type: DataTypes.STRING(120), allowNull: false },
      asesor_interno: { type: DataTypes.STRING(120), allowNull: false },
      documento_convenio: { type: DataTypes.STRING(255), allowNull: true },
      estatus: { type: DataTypes.STRING(40), allowNull: false, defaultValue: "activo" }
    },
    {
      sequelize,
      modelName: "Intern",
      tableName: "pasantes"
    }
  );

  return Intern;
};

