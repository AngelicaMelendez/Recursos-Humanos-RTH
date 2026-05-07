import { sanitizePayload } from "../utils/sanitize.js";

export const sanitizeMiddleware = (req, _res, next) => {
  if (req.body) {
    req.body = sanitizePayload(req.body);
  }

  next();
};

