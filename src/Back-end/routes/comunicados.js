const router = require('express').Router();
const ctrl = require('../controllers/comunicados_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { ROLE_GROUPS } = require('../utils/roles');

// Rutas públicas (lectura)
router.get('/', auth, ctrl.obtenerComunicados);
router.get('/mas-reciente', auth, ctrl.obtenerMasReciente);

// Reacciones (todos pueden reaccionar)
router.post('/:id/reacciones', auth, ctrl.agregarReaccion);

// Crear comunicado (Admin y Jefe de Área)
router.post('/', auth, roles(ROLE_GROUPS.ANNOUNCEMENT_MANAGERS), ctrl.crearComunicado);

// Editar comunicado (Admin y Jefe de Area)
router.patch('/:id', auth, roles(ROLE_GROUPS.ANNOUNCEMENT_MANAGERS), ctrl.editarComunicado);

// Eliminar comunicado (Admin y Jefe de Area)
router.delete('/:id', auth, roles(ROLE_GROUPS.ANNOUNCEMENT_MANAGERS), ctrl.eliminarComunicado);

// Historial y reacciones (Admin RH y Super Usuario)
router.get('/admin/historial', auth, roles(ROLE_GROUPS.ANNOUNCEMENT_MANAGERS), ctrl.obtenerHistorial);
router.get('/:id/reacciones', auth, roles(ROLE_GROUPS.ANNOUNCEMENT_MANAGERS), ctrl.obtenerReacciones);

module.exports = router;
