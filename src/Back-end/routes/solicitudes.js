const router = require('express').Router();
const ctrl = require('../controllers/solicitudes_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const upload = require('../middleware/upload');
const { ROLE_GROUPS } = require('../utils/roles');



// La lista se muestra segun rol: administracion/direccion ven todo; usuarios solo sus solicitudes.
router.get('/', auth, roles(ROLE_GROUPS.VIEWERS), ctrl.listar);
router.post('/', auth, roles(ROLE_GROUPS.SOLICITORS), upload.single('archivo_pdf'), ctrl.crear);
router.delete('/:id', auth, ctrl.eliminar);
router.patch('/:id/aprobar', auth, roles(ROLE_GROUPS.APPROVERS), ctrl.aprobar);
router.patch('/:id/rechazar', auth, roles(ROLE_GROUPS.APPROVERS), ctrl.rechazar);


module.exports = router;



