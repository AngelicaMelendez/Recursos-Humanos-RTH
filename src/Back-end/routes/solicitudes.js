const router = require('express').Router();
const ctrl = require('../controllers/solicitudes_Controller');

const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

const { ROLE_GROUPS } = require('../utils/roles');


router.get('/', auth, roles(ROLE_GROUPS.VIEWERS), ctrl.listar);
router.post('/', auth, roles(ROLE_GROUPS.SOLICITORS), upload.single('archivo_pdf'), ctrl.crear);
router.delete('/:id', auth, roles(ROLE_GROUPS.SOLICITORS), ctrl.eliminar);
router.patch('/:id/aprobar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS), ctrl.aprobar);
router.patch('/:id/rechazar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS), ctrl.rechazar);




module.exports = router;



