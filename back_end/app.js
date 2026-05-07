import cors from "cors";
import express from "express";
import helmet from "helmet";
import routes from "./routes/index.js";
import { sanitizeMiddleware } from "./middlewares/sanitizeMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeMiddleware);

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Sistema RH Hidalgo",
    timestamp: new Date().toISOString()
  });
});

app.use("/api", routes);
app.use(errorHandler);

export default app;

