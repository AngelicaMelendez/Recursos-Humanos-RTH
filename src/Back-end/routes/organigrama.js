const express = require('express');
const router = express.Router();
// 1. Traemos el controlador (Asegúrate de que la ruta a tu controlador sea la correcta)
const ctrl = require('../controllers/organigrama_Controller'); // o como se llame tu archivo en controllers

// 2. OJO AQUÍ: Deja solo '/' en lugar de '/organigrama'
router.get('/', ctrl.obtenerOrganigrama);
router.get('/areas', ctrl.listarAreas);
router.get('/direcciones', ctrl.listarDirecciones);
router.get('/departamentos', ctrl.listarDepartamentos);

module.exports = router;
