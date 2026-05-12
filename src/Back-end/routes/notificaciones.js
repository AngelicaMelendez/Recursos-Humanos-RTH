const router = require('express').Router();
const ctrl = require('../controllers/notificaciones_Controller');
const auth = require('../middleware/auth');

router.get('/', auth, ctrl.listarMisNotificaciones);
router.patch('/leer-todas', auth, ctrl.marcarTodasComoLeidas);
router.patch('/:id/leer', auth, ctrl.marcarComoLeida);

module.exports = router;
