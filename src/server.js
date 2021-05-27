const express = require('express');
require('express-async-errors');
require('dotenv').config();
require('./config/firebase');
require('./config/db');
const cors = require('cors');
const path = require('path');
const globalError = require('./middlewares/globalError');

const port = process.env.PORT || 3000;

const server = express();
const routes = require('./routes');

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);
server.use(globalError);

server.listen(
  port,
  console.log('Aplicação ligada!🔥🔥'),
);
