const router = require('express').Router();
const ctrl = require('../controllers/directorio_Controller');


// Áreas y puestos (para selectores)
router.get('/areas', ctrl.listarAreas);
router.get('/direcciones', ctrl.listarDirecciones);
router.get('/departamentos', ctrl.listarDepartamentos);
router.get('/puestos', ctrl.listarPuestos);

// CRUD directorio
router.get('/', ctrl.listar);
router.get('/:id', ctrl.obtenerUno);
router.put('/:id/baja', ctrl.baja);

module.exports = router;
