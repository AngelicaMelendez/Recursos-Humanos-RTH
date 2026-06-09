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
      ],
      order: [['departamento_id', 'ASC']],
    });

    const tree = [];
    const empleadoMap = {};

    empleados.forEach(emp => {
      empleadoMap[emp.id] = {
        id: emp.id,
        nombre: emp.nombre,
        unidad: emp.departamento?.nombre || emp.direccion?.nombre || 'Sin unidad',
        jefe_directo_id: emp.jefe_directo_id,
        hijos: []
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
  const { page = 1, limit = 20, search } = req.query;
  const where = { estatus: 'activo' };
  if (search) where.nombre = { [Op.like]: `%${search}%` };

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
    include: ['departamento', 'direccion', 'puesto'],
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
      order: [['nombre', 'ASC']]
    });
    res.json(puestos);
  } catch (error) {
    console.error('Error al listar puestos:', error);
    res.status(500).json({ error: 'Error al obtener puestos' });
  }
};
