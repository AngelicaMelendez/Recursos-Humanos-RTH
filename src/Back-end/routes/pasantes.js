const router = require('express').Router();
const ctrl = require('../controllers/frontend_Controller');

router.get('/', ctrl.pasantes);

module.exports = router;
