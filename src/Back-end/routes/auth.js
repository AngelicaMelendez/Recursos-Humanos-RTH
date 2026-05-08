const router = require('express').Router();
const ctrl = require('../controllers/auth_Controller');
const auth = require('../middleware/auth');

router.post('/login', ctrl.login);
router.get('/me', auth, ctrl.me);

module.exports = router;
