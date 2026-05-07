export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    message: error.message || "Ocurrió un error interno.",
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined
  });
};

