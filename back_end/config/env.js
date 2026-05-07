import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || "super-secret-hidalgo",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  dbDialect: process.env.DB_DIALECT || "mysql",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT || 3306),
  dbName: process.env.DB_NAME || "rh_hidalgo",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
  dbSync: process.env.DB_SYNC === "true",
  uploadDir: process.env.UPLOAD_DIR || "back_end/uploads"
};
