const express = require('express');
require('express-async-errors');
require('dotenv').config();
require('./config/firebase');
require('./config/db');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerFile = require('../swagger_output.json');
const globalError = require('./middlewares/globalError');

const port = process.env.PORT || 3000;

const server = express();
const routes = require('./routes');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(routes);
server.use(globalError);

server.listen(
  port,
  console.log('Aplicação ligada!🔥🔥'),
);
