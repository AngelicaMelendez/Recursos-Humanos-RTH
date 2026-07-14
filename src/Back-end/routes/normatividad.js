const router = require('express').Router();
const ctrl = require('../controllers/frontend_Controller');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { ROLE_GROUPS, PERMISSIONS } = require('../utils/roles');



router.get('/', ctrl.normatividad);
router.get('/:id', ctrl.getNormatividadById);
router.post('/', auth, upload.single('archivo_pdf'), ctrl.createNormatividad);
router.put('/:id', auth, upload.single('archivo_pdf'), ctrl.updateNormatividad);
router.patch('/:id/baja', auth, ctrl.bajaLogicaNormatividad);



module.exports = router;
