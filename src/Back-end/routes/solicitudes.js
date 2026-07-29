const router = require('express').Router();
const ctrl = require('../controllers/solicitudes_Controller');
const multer = require('multer');
const upload = require('../middleware/upload'); // Carga general a uploads/
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');

const { ROLE_GROUPS } = require('../utils/roles');

// Configuración de almacenamiento para PDFs de oficios aprobados
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/oficios/'); // Carpeta para oficios de aprobación
  },
  filename: (req, file, cb) => {
    const solicitudId = req.params.id;
    cb(null, `Oficio_Comision_FOL-${solicitudId}_${Date.now()}.pdf`);
  }
});

const uploadOficios = multer({ storage });

// RUTAS
router.get('/', auth, roles(ROLE_GROUPS.VIEWERS), ctrl.listar);

// Ruta para crear solicitud con archivo adjunto (Incapacidad, Maternidad, etc.)
router.post('/', auth, roles(ROLE_GROUPS.SOLICITORS), upload.single('archivo_pdf'), ctrl.crear);

// Ruta para descargar cualquier archivo adjunto o comprobante
router.get('/descargar/:filename', auth, roles(ROLE_GROUPS.VIEWERS), ctrl.descargarDocumento);

router.delete('/:id', auth, roles(ROLE_GROUPS.SOLICITORS), ctrl.eliminar);

// Ruta para VISUALIZAR
router.get('/ver/:filename', auth, roles(ROLE_GROUPS.VIEWERS), ctrl.visualizarDocumento);

// Ruta para aprobar adjuntando el oficio
router.patch('/:id/aprobar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS), uploadOficios.single('oficio_pdf'), ctrl.aprobar);









router.patch('/:id/rechazar', auth, roles(ROLE_GROUPS.REQUESTS_APPROVERS), ctrl.rechazar);









module.exports = router;
