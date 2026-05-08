const router = require('express').Router();
const ctrl = require('../controllers/frontend_Controller');

router.get('/', ctrl.dashboard);

module.exports = router;
