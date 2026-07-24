const router = require('express').Router();
const ctrl = require('../controllers/auditoria_Controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { PERMISSIONS } = require('../utils/roles');

router.get('/', auth, roles(PERMISSIONS.VIEWERS), ctrl.listar);

module.exports = router;
