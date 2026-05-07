import { verifyToken } from "../services/tokenService.js";

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "")
    : "";

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token válido." });
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "El token no es válido o expiró." });
  }
};

