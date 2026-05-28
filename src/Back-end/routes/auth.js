const router = require('express').Router();
const ctrl = require('../controllers/auth_Controller');
const auth = require('../middleware/auth');

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.get('/me', auth, ctrl.me);

module.exports = router;
