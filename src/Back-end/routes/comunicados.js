const router = require('express').Router();
const ctrl = require('../controllers/comunicados_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { PERMISSIONS } = require('../utils/roles');

// Rutas públicas (lectura)
router.get('/', auth, ctrl.obtenerComunicados);
router.get('/mas-reciente', auth, ctrl.obtenerMasReciente);

// Reacciones (todos pueden reaccionar)
router.post('/:id/reacciones', auth, ctrl.agregarReaccion);

// Crear comunicado (Admin y Jefe de Área)
router.post('/', auth, roles(PERMISSIONS.VIEWERS), ctrl.crearComunicado);

// Editar comunicado (Admin y Jefe de Area)
router.patch('/:id', auth, roles(PERMISSIONS.VIEWERS), ctrl.editarComunicado);

// Eliminar comunicado (Admin y Jefe de Area)
router.delete('/:id', auth, roles(PERMISSIONS.VIEWERS), ctrl.eliminarComunicado);

// Historial y reacciones (Admin RH y Super Usuario)
router.get('/admin/historial', auth, roles(PERMISSIONS.VIEWERS), ctrl.obtenerHistorial);
router.get('/:id/reacciones', auth, roles(PERMISSIONS.VIEWERS), ctrl.obtenerReacciones);

module.exports = router;
