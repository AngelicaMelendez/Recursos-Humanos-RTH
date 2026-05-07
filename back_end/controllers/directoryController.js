import {
  Employee,
  EmployeeDocument,
  Position,
  PositionHistory
} from "../models/index.js";
import { registerAudit } from "../services/auditService.js";

export const listActiveEmployees = async (_req, res) => {
  const employees = await Employee.findAll({
    where: { estatus: "activo" },
    include: [{ model: Position, as: "puesto" }],
    order: [["apellidos", "ASC"]]
  });

  res.json(employees);
};

export const listFormerEmployees = async (_req, res) => {
  const employees = await Employee.findAll({
    where: { estatus: "baja" },
    include: [{ model: Position, as: "puesto" }],
    order: [["fecha_baja", "DESC"]]
  });

  res.json(employees);
};

export const createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);

  await PositionHistory.create({
    empleado_id: employee.id,
    puesto_id: employee.puesto_id,
    fecha_inicio: employee.fecha_ingreso,
    motivo_cambio: "Alta inicial"
  });

  await registerAudit({
    usuario: req.user.email,
    accion: `Dio de alta al empleado ${employee.numero_empleado}`,
    modulo: "Directorio",
    ip: req.ip
  });

  res.status(201).json(employee);
};

export const updateEmployeeStatus = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);

  await employee.update({
    estatus: req.body.estatus,
    fecha_baja: req.body.fecha_baja || employee.fecha_baja,
    motivo_baja: req.body.motivo_baja || employee.motivo_baja,
    documento_baja: req.body.documento_baja || employee.documento_baja
  });

  await registerAudit({
    usuario: req.user.email,
    accion: `Actualizó el estatus del empleado ${employee.numero_empleado} a ${employee.estatus}`,
    modulo: "Directorio",
    ip: req.ip
  });

  res.json(employee);
};

export const uploadEmployeeDocument = async (req, res) => {
  const document = await EmployeeDocument.create({
    empleado_id: req.params.id,
    tipo_documento: req.body.tipo_documento,
    archivo_path: req.file?.path || "",
    fecha_subida: new Date()
  });

  res.status(201).json(document);
};

export const listEmployeeDocuments = async (req, res) => {
  const documents = await EmployeeDocument.findAll({
    where: { empleado_id: req.params.id },
    order: [["fecha_subida", "DESC"]]
  });

  res.json(documents);
};

export const listEmployeeHistory = async (req, res) => {
  const history = await PositionHistory.findAll({
    where: { empleado_id: req.params.id },
    include: [{ model: Position, as: "puesto" }],
    order: [["fecha_inicio", "DESC"]]
  });

  res.json(history);
};

