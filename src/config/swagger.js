const swaggerUi = require("swagger-ui-express");

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Trail API",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:5000/api"
    }
  ]
};

module.exports = app => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};