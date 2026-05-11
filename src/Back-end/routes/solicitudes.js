const router = require('express').Router();
const frontendCtrl = require('../controllers/frontend_Controller');
const ctrl = require('../controllers/solicitudes_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

router.get('/', frontendCtrl.solicitudes);
router.post('/', auth, roles('admin_rh', 'empleado'), ctrl.crear);
router.patch('/:id/aprobar', auth, roles('admin_rh', 'direccion', 'jefe_area'), ctrl.aprobar);
router.patch('/:id/rechazar', auth, roles('admin_rh', 'direccion', 'jefe_area'), ctrl.rechazar);

module.exports = router;
