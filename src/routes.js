const express = require('express')
const routes = express.Router();
const Dream = require('./controllers/dreamController');//? tirar o Dream?
const User = require('./controllers/userController')



routes.get('/dream', Dream.get);

routes.get('/dream/:id', Dream.getOne);

routes.post('/dream/search', Dream.getName)

routes.post('/dream', Dream.create);

routes.put('/dream/:id', Dream.update);

routes.delete('/dream/:id', Dream.delete);


routes.get('/user', User.getAll)

//rota para ver um unico usuario existente pelo id
routes.get('/user/:id', User.getById);

//rota para criar um novo usuario
routes.post('/user', User.create)

//rota para deletar um usuario
routes.delete('/user/:id', User.deleteById)

//rota para atualzar informações de um usuario pelo id
routes.put('/user/:id', User.putById)

module.exports = routes;