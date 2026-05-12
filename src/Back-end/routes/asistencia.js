const router = require('express').Router();
const ctrl = require('../controllers/asistencia_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

// Check-in y Check-out (todos los empleados)
router.post('/entrada', auth, ctrl.registrarEntrada);
router.post('/salida', auth, ctrl.registrarSalida);

// Obtener asistencia personal
router.get('/mi-asistencia', auth, ctrl.obtenerMiAsistencia);

// Obtener asistencia de un empleado específico (empleado o admin)
router.get('/empleado/:empleado_id', auth, ctrl.obtenerAsistencia);

// Resumen mensual (Solo Admin)
router.get('/admin/resumen-mes', auth, roles(['admin_rh']), ctrl.obtenerResumenMes);

module.exports = router;
