const db = require('../models');
const { Op } = require('sequelize');

// Obtener organigrama completo (árbol jerárquico)
exports.obtenerOrganigrama = async (req, res) => {
  try {
    console.log('=== obtenerOrganigrama called ===');

    // Obtener todos los empleados activos con su área, puesto y jefe
    const empleados = await db.Empleado.findAll({
      where: { estatus: 'activo' },
      include: [
        { model: db.Area, as: 'area' },
        { model: db.Puesto, as: 'puesto' },
        { model: db.Empleado, as: 'jefe', attributes: ['id', 'nombre'] }
      ],
      order: [['area_id', 'ASC'], ['puesto_id', 'ASC']]
    });

    console.log('Empleados found:', empleados.length);

    // Construir árbol jerárquico basado en jefe_directo_id
    const tree = [];
    const empleadoMap = {};

    // Primer paso: crear nodos para cada empleado
    empleados.forEach(emp => {
      empleadoMap[emp.id] = {
        id: emp.id,
        nombre: emp.nombre,
        puesto: emp.puesto ? emp.puesto.nombre : 'Sin puesto',
        area: emp.area ? emp.area.nombre : 'Sin área',
        jefe_directo_id: emp.jefe_directo_id,
        hijos: []
      };
    });

    // segundo paso: construir el árbol
    empleados.forEach(emp => {
      if (emp.jefe_directo_id && empleadoMap[emp.jefe_directo_id]) {
        // Tiene jefe, agregarlo como hijo
        empleadoMap[emp.jefe_directo_id].hijos.push(empleadoMap[emp.id]);
      } else {
        // No tiene jefe, es raíz
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
  const { page = 1, limit = 20, search, area_id, puesto_id, estatus = 'activo' } = req.query;
  const where = {};

  if (estatus) {
    where.estatus = estatus;
  }

  if (area_id) {
    where.area_id = area_id;
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
    include: ['area', 'puesto', 'jefe'],
    offset: (Number(page) - 1) * Number(limit),
    limit: Number(limit),
  });
  res.json(empleados);
};

exports.obtenerUno = async (req, res) => {
  const emp = await db.Empleado.findByPk(req.params.id, {
    include: ['area', 'puesto', 'documentos', 'historial', 'incidencias'],
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

// Listar todas las áreas
exports.listarAreas = async (req, res) => {
  try {
    const areas = await db.Area.findAll({
      include: [{ model: db.Area, as: 'padre', attributes: ['id', 'nombre', 'tipo'] }],
      order: [['tipo', 'ASC'], ['nombre', 'ASC']]
    });
    res.json(areas);
  } catch (error) {
    console.error('Error al listar áreas:', error);
    res.status(500).json({ error: 'Error al obtener áreas' });
  }
};

exports.listarDirecciones = async (req, res) => {
  try {
    const direcciones = await db.Area.findAll({
      where: { tipo: 'direccion' },
      include: [
        { model: db.Area, as: 'padre', attributes: ['id', 'nombre', 'tipo'] },
        { model: db.Area, as: 'subareas', attributes: ['id', 'nombre', 'tipo'] },
      ],
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
    const where = { tipo: 'departamento' };
    if (req.query.direccion_id) {
      where.area_padre_id = req.query.direccion_id;
    }

    const departamentos = await db.Area.findAll({
      where,
      include: [{ model: db.Area, as: 'padre', attributes: ['id', 'nombre', 'tipo'] }],
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
      include: [{ model: db.Area, as: 'area', attributes: ['id', 'nombre'] }],
      order: [['nombre', 'ASC']]
    });
    res.json(puestos);
  } catch (error) {
    console.error('Error al listar puestos:', error);
    res.status(500).json({ error: 'Error al obtener puestos' });
  }
};
