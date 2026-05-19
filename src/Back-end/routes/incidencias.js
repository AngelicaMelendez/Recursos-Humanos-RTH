const router = require('express').Router();
const ctrl = require('../controllers/incidencias_Controller');
const auth = require('../middleware/auth');

router.get('/', auth, ctrl.listar);
router.post('/', auth, ctrl.crear);
router.get('/:id', auth, ctrl.obtenerPorId);
router.patch('/:id', auth, ctrl.actualizar);
router.delete('/:id', auth, ctrl.eliminar);
router.get('/empleado/:empleado_id', auth, ctrl.obtenerPorEmpleado);

module.exports = router;
