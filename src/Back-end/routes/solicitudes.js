const router = require('express').Router();
const ctrl = require('../controllers/solicitudes_Controller');
const multer = require('multer');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { ROLE_GROUPS, PERMISSIONS } = require('../utils/roles');



router.get('/', auth, ctrl.listar);
router.post('/', auth, ctrl.crear);
router.delete('/:id', auth, ctrl.eliminar);
router.patch('/:id/aprobar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS), ctrl.aprobar);
router.patch('/:id/rechazar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS), ctrl.rechazar);




module.exports = router;



