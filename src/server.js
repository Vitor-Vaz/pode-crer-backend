require('./config/db');
require('./config/firebase');
const express = require('express');
const cors = require('cors');

const server = express();
const routes = require('./routes');

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.listen(
  8001,
  console.log('Aplicação ligada! acesse-a pelo link http://localhost:8001/'),
);
