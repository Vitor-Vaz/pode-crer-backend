const express = require('express')
const routes = express.Router();
const Dream = require('./controllers/dreamController');
const User = require('./controllers/userController')



routes.get('/dream', Dream.get);

routes.get('/dream/:id', Dream.getOne);

routes.post('/dream', Dream.create);

routes.put('/dream/:id', Dream.update);

routes.delete('/dream/:id', Dream.delete);

routes.get('/user', User.getAll)

routes.get('/user/:id', User.getById);


module.exports = routes;