import __dirname from "../utils/dirname.js"
import swaggerJsdoc from 'swagger-jsdoc';

//swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Catalogo Web',
      description: 'API documentación para la aplicación de catálogo web',
    },
  },
  apis:[`${__dirname}/../docs/**/*.yaml`],
}

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;