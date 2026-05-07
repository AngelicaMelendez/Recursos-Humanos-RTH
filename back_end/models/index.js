import { sequelize } from "../config/database.js";
import AreaModel from "./Area.js";
import PositionModel from "./Position.js";
import EmployeeModel from "./Employee.js";
import EmployeeDocumentModel from "./EmployeeDocument.js";
import PositionHistoryModel from "./PositionHistory.js";
import IncidentModel from "./Incident.js";
import RequestModel from "./Request.js";
import NormativityModel from "./Normativity.js";
import VacancyModel from "./Vacancy.js";
import VisitorModel from "./Visitor.js";
import InternModel from "./Intern.js";
import UserModel from "./User.js";
import AuditLogModel from "./AuditLog.js";

export const Area = AreaModel(sequelize);
export const Position = PositionModel(sequelize);
export const Employee = EmployeeModel(sequelize);
export const EmployeeDocument = EmployeeDocumentModel(sequelize);
export const PositionHistory = PositionHistoryModel(sequelize);
export const Incident = IncidentModel(sequelize);
export const Request = RequestModel(sequelize);
export const Normativity = NormativityModel(sequelize);
export const Vacancy = VacancyModel(sequelize);
export const Visitor = VisitorModel(sequelize);
export const Intern = InternModel(sequelize);
export const User = UserModel(sequelize);
export const AuditLog = AuditLogModel(sequelize);

Area.belongsTo(Area, { as: "parentArea", foreignKey: "area_padre_id" });
Area.hasMany(Area, { as: "subareas", foreignKey: "area_padre_id" });

Area.hasMany(Position, { foreignKey: "area_id", as: "puestos" });
Position.belongsTo(Area, { foreignKey: "area_id", as: "area" });

Position.hasMany(Employee, { foreignKey: "puesto_id", as: "empleados" });
Employee.belongsTo(Position, { foreignKey: "puesto_id", as: "puesto" });
Employee.belongsTo(Employee, { foreignKey: "jefe_directo_id", as: "jefeDirecto" });
Employee.hasMany(Employee, { foreignKey: "jefe_directo_id", as: "colaboradores" });

Employee.hasMany(EmployeeDocument, { foreignKey: "empleado_id", as: "documentos" });
EmployeeDocument.belongsTo(Employee, { foreignKey: "empleado_id", as: "empleado" });

Employee.hasMany(PositionHistory, { foreignKey: "empleado_id", as: "historialPuestos" });
PositionHistory.belongsTo(Employee, { foreignKey: "empleado_id", as: "empleado" });
PositionHistory.belongsTo(Position, { foreignKey: "puesto_id", as: "puesto" });

Employee.hasMany(Incident, { foreignKey: "empleado_id", as: "incidencias" });
Incident.belongsTo(Employee, { foreignKey: "empleado_id", as: "empleado" });

Employee.hasMany(Request, { foreignKey: "empleado_id", as: "solicitudes" });
Request.belongsTo(Employee, { foreignKey: "empleado_id", as: "empleado" });

Area.hasMany(Vacancy, { foreignKey: "area_id", as: "vacantes" });
Vacancy.belongsTo(Area, { foreignKey: "area_id", as: "area" });

Employee.hasOne(User, { foreignKey: "empleado_id", as: "usuario" });
User.belongsTo(Employee, { foreignKey: "empleado_id", as: "empleado" });

export const initDatabase = async (shouldSync = false) => {
  await sequelize.authenticate();

  if (shouldSync) {
    await sequelize.sync();
  }
};

