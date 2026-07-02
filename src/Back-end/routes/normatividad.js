const router = require('express').Router();
const ctrl = require('../controllers/frontend_Controller');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth')


router.get('/', ctrl.normatividad);
router.post('/', auth, upload.single('archivo_pdf'), ctrl.createNormatividad);
router.put('/:id', auth, upload.single('archivo_pdf'), ctrl.updateNormatividad); 
router.patch('/:id/baja', auth, ctrl.bajaLogicaNormatividad);
router.delete('/:id', auth, ctrl.deleteNormatividad);


module.exports = router;
