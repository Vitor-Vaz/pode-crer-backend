require('dotenv').config();
require('./config/db');
require('./config/firebase');
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const globalError = require('./middlewares/globalError');

const port = process.env.PORT || 8001;

const server = express();
const routes = require('./routes');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.use(globalError);

server.listen(
  port,
  console.log('Aplicação ligada!🔥🔥'),
);
