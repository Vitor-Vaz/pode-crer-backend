const swaggerAutogen = require('swagger-autogen')();

const outputFile = './docs/swagger/swagger_output.json';
const endpointsFiles = ['./src/routes.js'];

swaggerAutogen(outputFile, endpointsFiles);
