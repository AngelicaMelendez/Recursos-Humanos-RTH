import app from "./app.js";
import { env } from "./config/env.js";
import { initDatabase } from "./models/index.js";

const bootstrap = async () => {
  try {
    await initDatabase(env.dbSync);
    console.log("Base de datos conectada correctamente.");
  } catch (error) {
    console.warn("No fue posible conectar la base de datos al iniciar.", error.message);
  }

  app.listen(env.port, () => {
    console.log(`Servidor escuchando en http://localhost:${env.port}`);
  });
};

bootstrap();
