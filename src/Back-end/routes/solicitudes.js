const router = require('express').Router();
const ctrl = require('../controllers/solicitudes_Controller');
const multer = require('multer');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const upload = require('../middleware/upload');
const { ROLE_GROUPS } = require('../utils/roles');


router.get('/', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS_VIEWERS), ctrl.listar);
router.post('/', auth, ctrl.crear);
router.delete('/:id', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS_VIEWERS), ctrl.eliminar);
router.patch('/:id/aprobar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS_VIEWERS), ctrl.aprobar);
router.patch('/:id/rechazar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS_VIEWERS), ctrl.rechazar);




module.exports = router;



