console.log("=========================================");
console.log("🚀 ¡ESTE SÍ ES EL BACKEND REAL QUE ESTÁ CORRIENDO!");
console.log("=========================================");
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const db = require('./models');
const { runSeeders } = require('./scripts/runSeeders');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/calendario', require('./routes/calendario'));
app.use('/api/directorio', require('./routes/directorio'));
app.use('/api/solicitudes', require('./routes/solicitudes'));
app.use('/api/incidencias', require('./routes/incidencias'));
app.use('/api/normatividad', require('./routes/normatividad'));
app.use('/api/vacantes', require('./routes/vacantes'));
app.use('/api/organigrama', require('./routes/organigrama'));
app.use('/api/auditoria', require('./routes/auditoria'));
app.use('/api/comunicados', require('./routes/comunicados'));
app.use('/api/asistencia', require('./routes/asistencia'));
app.use('/api/notificaciones', require('./routes/notificaciones'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Recursos Humanos RTH API' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

async function connectDatabase() {
  try {
    console.log('Intentando conectar a la base de datos:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      seedOnStartup: process.env.DB_SEED_ON_STARTUP,
    });

    if (typeof db.sequelize.ensureDatabaseExists === 'function') {
      await db.sequelize.ensureDatabaseExists();
    }

    await db.sequelize.authenticate();
    await db.sequelize.sync();

    const seedOnStartup = process.env.DB_SEED_ON_STARTUP === 'true';
    const recordCount = await db.Direccion.count().catch(() => 0);
    const shouldSeed = recordCount === 0;

    if (shouldSeed) {
      console.log('Seed inicial: ejecutando seeders porque la base esta vacia.');
      await runSeeders({ closeConnection: false, setExitCode: false });
    } else if (seedOnStartup) {
      console.log('DB_SEED_ON_STARTUP=true, pero la base ya tiene datos. Usa npm run db:reset-data para recargar seeders.');
    }

    console.log('Base de datos conectada');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos. La API usara respuestas de respaldo.');
    console.error('Error completo:', error);
    if (error.original) {
      console.error('Error original:', error.original);
    }
  }
}

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
  connectDatabase();
});
