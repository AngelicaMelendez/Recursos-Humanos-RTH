const db = require('../models');

async function buildTree(parentId = null) {
  const areas = await db.Area.findAll({
    where: { area_padre_id: parentId },
    include: [
      { association: 'empleados', include: [{ association: 'puesto' }] }
    ]
  });
  const tree = [];
  for (const area of areas) {
    const node = {
      id: area.id,
      name: area.nombre,
      title: 'Área',
      children: []
    };
    // Agregar empleados como hijos hoja
    area.empleados.forEach(emp => {
      node.children.push({
        id: `emp-${emp.id}`,
        name: emp.nombre,
        title: emp.puesto?.nombre || 'Sin puesto',
        children: []
      });
    });
    // Agregar subáreas recursivamente
    const subareas = await buildTree(area.id);
    node.children = node.children.concat(subareas);
    tree.push(node);
  }
  return tree;
}

exports.getOrganigrama = async (req, res) => {
  const tree = await buildTree();
  // Nodo raíz: Dirección General (si no está en BD, crea uno manual)
  const raiz = {
    id: 'root',
    name: 'Dirección General',
    title: '',
    children: tree
  };
  res.json(raiz);
};
