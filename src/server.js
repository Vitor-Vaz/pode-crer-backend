require('dotenv').config();
require('./config/db');
require('./config/firebase');
require('./config/db');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 8001;

const server = express();
const routes = require('./routes');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);


server.listen(
  port,
  console.log('Aplicação ligada!🔥🔥'),
);
