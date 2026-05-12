const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./models');
const seedDatabase = require('./seeders/seedDatabase');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/calendario', require('./routes/calendario'));
app.use('/api/organigrama', require('./routes/organigrama'));
app.use('/api/directorio', require('./routes/directorio'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/normatividad', require('./routes/normatividad'));
app.use('/api/vacantes', require('./routes/vacantes'));
app.use('/api/visitantes', require('./routes/visitantes'));
app.use('/api/pasantes', require('./routes/pasantes'));
app.use('/api/control-accesos', require('./routes/control-accesos'));
app.use('/api/auditoria', require('./routes/auditoria'));
app.use('/api/comunicados', require('./routes/comunicados'));
app.use('/api/asistencia', require('./routes/asistencia'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Recursos Humanos RTH API' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

async function connectDatabase() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    await seedDatabase(db);
    console.log('Base de datos conectada');
  } catch (error) {
    console.warn('No se pudo conectar a la base de datos. La API usara respuestas de respaldo.');
    console.warn(error.message);
  }
}

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
  connectDatabase();
});
