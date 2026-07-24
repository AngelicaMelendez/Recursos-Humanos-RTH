const router = require('express').Router();
const ctrl = require('../controllers/vacantes_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { PERMISSIONS } = require('../utils/roles');

router.get('/', auth, ctrl.listar);
router.post('/', auth, roles(PERMISSIONS.REQUESTS_APPROVERS), ctrl.crear);
router.patch('/:id', auth, roles(PERMISSIONS.REQUESTS_APPROVERS), ctrl.actualizar);
router.patch('/:id/cerrar', auth, roles(PERMISSIONS.REQUESTS_APPROVERS), ctrl.cerrar);
router.delete('/:id', auth, roles(PERMISSIONS.REQUESTS_APPROVERS), ctrl.eliminar);

module.exports = router;
