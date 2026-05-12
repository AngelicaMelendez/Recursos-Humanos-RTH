const router = require('express').Router();
const ctrl = require('../controllers/comunicados_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Rutas públicas (lectura)
router.get('/', auth, ctrl.obtenerComunicados);
router.get('/mas-reciente', auth, ctrl.obtenerMasReciente);

// Reacciones (todos pueden reaccionar)
router.post('/:id/reacciones', auth, ctrl.agregarReaccion);

// Crear comunicado (Admin y Jefe de Área)
router.post('/', auth, roles(['admin_rh', 'jefe_area']), ctrl.crearComunicado);

// Editar comunicado (Admin y autor)
router.patch('/:id', auth, ctrl.editarComunicado);

// Eliminar comunicado (Solo Admin)
router.delete('/:id', auth, roles(['admin_rh']), ctrl.eliminarComunicado);

// Historial y reacciones (Solo Admin)
router.get('/admin/historial', auth, roles(['admin_rh']), ctrl.obtenerHistorial);
router.get('/:id/reacciones', auth, roles(['admin_rh']), ctrl.obtenerReacciones);

module.exports = router;
