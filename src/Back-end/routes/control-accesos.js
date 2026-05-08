const router = require('express').Router();
const ctrl = require('../controllers/frontend_Controller');

router.get('/', ctrl.accesos);

module.exports = router;
