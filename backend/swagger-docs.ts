import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Nawy Task APIs ",
      version: "1.0.0",
      description: "Swagger documentation for all endpoints",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
  },
  apis: ["./api/controllers/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
