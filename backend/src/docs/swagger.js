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
        //Production backend deployed on Render
        url: "https://lifeos-api-m1k2.onrender.com",
        description: "Production server",
      },

      {
        //Local backend used during  development
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec =
  swaggerJsDoc(options);

module.exports = swaggerSpec;