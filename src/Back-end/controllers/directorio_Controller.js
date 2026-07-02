const db = require('../models');
const { Op } = require('sequelize');

// Obtener organigrama completo (árbol jerárquico)
exports.obtenerOrganigrama = async (req, res) => {
  try {
    const empleados = await db.Empleado.findAll({
      where: { estatus: 'activo' },
      //  Ahora incluimos todo plano y limpio
      include: [
        { model: db.Direccion, as: 'direccion' },
        { model: db.Departamento, as: 'departamento' },
        { model: db.Puesto, as: 'puesto' },
        { model: db.Empleado, as: 'jefe', attributes: ['id', 'nombre'] },
      ],
      order: [
        ['departamento_id', 'ASC'],
        ['direccion_id', 'ASC'],
        ['puesto_id', 'ASC']
      ],
    });

    const tree = [];
    const empleadoMap = {};

    empleados.forEach(emp => {
      empleadoMap[emp.id] = {
        id: emp.id,
        nombre: emp.nombre,
        puesto: emp.puesto ? emp.puesto.nombre : 'Sin puesto',
        //  Ahora lee tanto dirección como departamento al mismo nivel
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

// Listar empleados para selector (Directorio)
exports.listar = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, direccion_id, departamento_id, puesto_id, estatus = 'activo' } = req.query;
    const where = {};

    if (estatus) where.estatus = estatus;
  
    // 💡 Filtros directos y planos ya que las columnas sí existen en la tabla empleados
    if (direccion_id && direccion_id !== 'null' && direccion_id !== 'undefined') where.direccion_id = direccion_id;
    if (departamento_id && departamento_id !== 'null' && departamento_id !== 'undefined') where.departamento_id = departamento_id;
    if (puesto_id && puesto_id !== 'null' && puesto_id !== 'undefined') where.puesto_id = puesto_id;

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
      // 💡 Corregido: Se quitó la variable rota y se usan los alias limpios con required: false
      include: [
        { model: db.Direccion, as: 'direccion', required: false },
        { model: db.Departamento, as: 'departamento', required: false },
        { model: db.Puesto, as: 'puesto', required: false },
        { model: db.Empleado, as: 'jefe', required: false }
      ],
      offset: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
      order: [['id', 'ASC']]
    });
    
    return res.json(empleados);
  } catch (error) {
    console.error('❌ ERROR CRÍTICO EN LISTAR EMPLEADOS:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor', 
      detalles: error.message 
    });
  }
};

// Obtener un empleado en específico
exports.obtenerUno = async (req, res) => {
  try {
    const emp = await db.Empleado.findByPk(req.params.id, {
      // 💡 Cambiados los strings planos por objetos formales de Sequelize
      include: [
        { model: db.Direccion, as: 'direccion', required: false },
        { model: db.Departamento, as: 'departamento', required: false },
        { model: db.Puesto, as: 'puesto', required: false },
        { model: db.Empleado, as: 'jefe', required: false },
        'documentos', 
        'historial', 
        'incidencias'
      ],
    });
    if (!emp) return res.status(404).json({ error: 'No encontrado' });
    return res.json(emp);
  } catch (error) {
    console.error('Error al obtener un empleado:', error);
    return res.status(500).json({ error: 'Error al obtener empleado' });
  }
};

// Dar de baja empleado
exports.baja = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Empleado.update(
      { estatus: 'baja', fecha_baja: new Date(), motivo_baja: req.body.motivo },
      { where: { id } }
    );
    return res.json({ mensaje: 'Empleado dado de baja' });
  } catch (error) {
    console.error('Error al dar de baja:', error);
    return res.status(500).json({ error: 'Error al procesar la baja' });
  }
};

// Listar todas las direcciones
exports.listarDirecciones = async (req, res) => {
  try {
    const direcciones = await db.Direccion.findAll({
      attributes: ['id', 'nombre', 'createdAt', 'updatedAt'], // Trae solo lonecesario
      order: [['nombre', 'ASC']],
    });

    return res.json(direcciones);
  } catch (error) {
    console.error('Error al listar direcciones:', error);
    return res.status(500).json({ error: 'Error al obtener direcciones' });
  }
};

// Listar todos los departamentos
exports.listarDepartamentos = async (req, res) => {
  try {
    // Eliminamos por completo el filtro de direccion_id ya que no existe esa columna en el modelo
    const departamentos = await db.Departamento.findAll({
      attributes: ['id', 'nombre', 'createdAt', 'updatedAt'], // Trae solo lo necesario
      order: [['nombre', 'ASC']],
    });

    return res.json(departamentos);
  } catch (error) {
    console.error('Error al listar departamentos:', error);
    return res.status(500).json({ error: 'Error al obtener departamentos' });
  }
};

// Listar todos los puestos
exports.listarPuestos = async (req, res) => {
  try {
    const puestos = await db.Puesto.findAll({
      include: [{ model: db.Departamento, as: 'departamento', attributes: ['id', 'nombre'] }],
      order: [['nombre', 'ASC']],
    });
    return res.json(puestos);
  } catch (error) {
    console.error('Error al listar puestos:', error);
    return res.status(500).json({ error: 'Error al obtener puestos' });
  }
};