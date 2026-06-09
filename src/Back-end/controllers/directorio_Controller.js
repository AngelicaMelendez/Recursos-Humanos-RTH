const db = require('../models');
const { Op } = require('sequelize');

// Obtener organigrama completo (árbol jerárquico)
exports.obtenerOrganigrama = async (req, res) => {
  try {
    const empleados = await db.Empleado.findAll({
      where: { estatus: 'activo' },
      include: [
        { model: db.Departamento, as: 'departamento' },
        { model: db.Direccion, as: 'direccion' },
        { model: db.Puesto, as: 'puesto' },
        { model: db.Empleado, as: 'jefe', attributes: ['id', 'nombre'] },
      ],
      order: [['departamento_id', 'ASC'], ['puesto_id', 'ASC']],
    });

    const tree = [];
    const empleadoMap = {};

    empleados.forEach(emp => {
      empleadoMap[emp.id] = {
        id: emp.id,
        nombre: emp.nombre,
        puesto: emp.puesto ? emp.puesto.nombre : 'Sin puesto',
        unidad: emp.departamento?.nombre || emp.direccion?.nombre || 'Sin unidad',
        jefe_directo_id: emp.jefe_directo_id,
        hijos: [],
      };
    });

    empleados.forEach(emp => {
      if (emp.jefe_directo_id && empleadoMap[emp.jefe_directo_id]) {
        empleadoMap[emp.jefe_directo_id].hijos.push(empleadoMap[emp.id]);
      } else {
        tree.push(empleadoMap[emp.id]);
      }
    });

    res.json(tree);
  } catch (error) {
    console.error('Error al obtener organigrama:', error);
    res.status(500).json({ error: 'Error al obtener organigrama' });
  }
};

// Listar empleados para selector
exports.listar = async (req, res) => {
  const { page = 1, limit = 20, search, departamento_id, direccion_id, puesto_id, estatus = 'activo' } = req.query;
  const where = {};

  if (estatus) {
    where.estatus = estatus;
  }

  if (departamento_id) {
    where.departamento_id = departamento_id;
  }

  if (direccion_id) {
    where.direccion_id = direccion_id;
  }

  if (puesto_id) {
    where.puesto_id = puesto_id;
  }

  if (search) {
    const trimmed = search.trim();
    const employeeCode = trimmed.match(/EMP-?0*(\d+)/i);
    const numberMatch = trimmed.match(/^\d+$/);

    if (employeeCode) {
      where.id = employeeCode[1];
    } else if (numberMatch) {
      where.id = trimmed;
    } else {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${trimmed}%` } },
        { apellidos: { [Op.like]: `%${trimmed}%` } },
        { curp: { [Op.like]: `%${trimmed}%` } },
        { rfc: { [Op.like]: `%${trimmed}%` } }
      ];
    }
  }

  const empleados = await db.Empleado.findAndCountAll({
    where,
    include: ['departamento', 'direccion', 'puesto', 'jefe'],
    offset: (Number(page) - 1) * Number(limit),
    limit: Number(limit),
  });
  res.json(empleados);
};

exports.obtenerUno = async (req, res) => {
  const emp = await db.Empleado.findByPk(req.params.id, {
    include: ['departamento', 'direccion', 'puesto', 'documentos', 'historial', 'incidencias'],
  });
  if (!emp) return res.status(404).json({ error: 'No encontrado' });
  res.json(emp);
};

exports.baja = async (req, res) => {
  const { id } = req.params;
  await db.Empleado.update(
    { estatus: 'baja', fecha_baja: new Date(), motivo_baja: req.body.motivo },
    { where: { id } }
  );
  res.json({ mensaje: 'Empleado dado de baja' });
};

exports.listarDirecciones = async (req, res) => {
  try {
    const direcciones = await db.Direccion.findAll({
      include: [{ model: db.Departamento, as: 'departamentos', attributes: ['id', 'nombre'] }],
      order: [['nombre', 'ASC']],
    });
    res.json(direcciones);
  } catch (error) {
    console.error('Error al listar direcciones:', error);
    res.status(500).json({ error: 'Error al obtener direcciones' });
  }
};

exports.listarDepartamentos = async (req, res) => {
  try {
    const where = {};
    if (req.query.direccion_id) {
      where.direccion_id = req.query.direccion_id;
    }

    const departamentos = await db.Departamento.findAll({
      where,
      include: [{ model: db.Direccion, as: 'direccion', attributes: ['id', 'nombre'] }],
      order: [['nombre', 'ASC']],
    });
    res.json(departamentos);
  } catch (error) {
    console.error('Error al listar departamentos:', error);
    res.status(500).json({ error: 'Error al obtener departamentos' });
  }
};

// Listar todos los puestos
exports.listarPuestos = async (req, res) => {
  try {
    const puestos = await db.Puesto.findAll({
      include: [{ model: db.Departamento, as: 'departamento', attributes: ['id', 'nombre'] }],
      order: [['nombre', 'ASC']],
    });
    res.json(puestos);
  } catch (error) {
    console.error('Error al listar puestos:', error);
    res.status(500).json({ error: 'Error al obtener puestos' });
  }
};
