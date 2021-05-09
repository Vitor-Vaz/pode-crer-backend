const express = require('express')
const routes = express.Router();
const Dream = require('./controllers/dreamController');//? tirar o Dream?
const User = require('./controllers/userController')

routes.get('/dream', Dream.get);//? tirar o Dream?
//rota para ver todos usuarios existentes
routes.get('/user', User.getAll)

//rota para ver um unico usuario existente pelo id
routes.get('/user/:id', User.getById);

//rota para criar um novo usuario
routes.post('/user/create', User.create)

//rota para deletar um usuario
routes.delete('/user/delete/:id', User.deleteById)

//rota para atualzar informações de um usuario pelo id
routes.put('/user/put/:id', User.putById) //TODO fazer o put 09/05/2021

module.exports = routes;