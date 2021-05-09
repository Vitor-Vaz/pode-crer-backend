const express = require('express');
const server = express();

const routes = require('./routes.js');


server.use(express.json());
server.use(express.urlencoded({ extended: true}));



server.use(routes);



server.listen(8001, console.log("Aplicação ligada! acesse-a pelo link http://localhost:8001/"))