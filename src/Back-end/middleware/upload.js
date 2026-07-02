const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  },
});

module.exports = multer({ 
  storage, 
  limits: { fileSize: 25 * 1024 * 1024 } });  //Para el limite de peso de archivos a subir en Normatividad, Solicitudes o cualquier modulo