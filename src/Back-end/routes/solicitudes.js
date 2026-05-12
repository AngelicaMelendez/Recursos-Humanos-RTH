const router = require('express').Router();
const ctrl = require('../controllers/solicitudes_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

router.get('/', auth, ctrl.listar);
router.post('/', auth, ctrl.crear);
router.delete('/:id', auth, ctrl.eliminar);
router.patch('/:id/aprobar', auth, roles('admin_rh', 'direccion', 'jefe_area'), ctrl.aprobar);
router.patch('/:id/rechazar', auth, roles('admin_rh', 'direccion', 'jefe_area'), ctrl.rechazar);

module.exports = router;
