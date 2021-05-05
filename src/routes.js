const express = require('express')
const routes = express.Router();
const Dream = require('./controllers/dreamController');
const User = require('./controllers/userController')

//teste de comentarioS

routes.get('/dream', Dream.get);


routes.get('/user', User.getAll)

routes.get('/user/:id', User.getById);


module.exports = routes;