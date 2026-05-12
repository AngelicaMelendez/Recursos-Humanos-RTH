const router = require('express').Router();
const ctrl = require('../controllers/asistencia_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

router.post('/entrada', auth, ctrl.registrarEntrada);
router.post('/salida', auth, ctrl.registrarSalida);

router.get('/mi-asistencia', auth, ctrl.obtenerMiAsistencia);
router.get('/empleado/:empleado_id', auth, ctrl.obtenerAsistencia);
router.get('/admin/resumen-mes', auth, roles('admin_rh', 'jefe_area'), ctrl.obtenerResumenMes);

module.exports = router;
