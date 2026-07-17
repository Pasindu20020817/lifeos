const swaggerJsDoc = require("swagger-jsdoc");

/**
 * Swagger Configuration
 */
const options = {

  definition: {
    openapi: "3.0.0",

    info: {
      title: "LifeOS API",
      version: "1.0.0",
      description:
        "LifeOS Productivity Platform API",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec =
  swaggerJsDoc(options);

module.exports = swaggerSpec;