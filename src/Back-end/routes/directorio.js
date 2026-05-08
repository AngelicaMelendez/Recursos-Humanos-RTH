const router = require('express').Router();
const ctrl = require('../controllers/frontend_Controller');

router.get('/', ctrl.directorio);

module.exports = router;
