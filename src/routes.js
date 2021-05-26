const express = require('express');

const routes = express.Router();
const Dream = require('./controllers/dreamController');
const User = require('./controllers/userController');
const Donate = require('./controllers/donateController');



const multer = require('multer');

const Index = require('./config/firebase/index')

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 5 * 1024 * 1024,
})


routes.post('/profile', Multer.single('imagem'), Index.uploadImage, (req, res) => {

    console.log(req.file.firebaseUrl);

    res.send(req.file.firebaseUrl);
})








routes.post('/donate', Donate.donating);

routes.get('/dream/history/:id', Donate.allDonatesInADream);

routes.get('/dream', Dream.get);

routes.get('/dream/userdream/:userid', Dream.searchDreamUser);

routes.get('/dream/:id', Dream.getOne);

routes.get('/dream/search/:title/:page', Dream.getTitle);

routes.post('/dream', Dream.create.validating, Dream.create.creating);

routes.put('/dream/:id', Dream.update.validating, Dream.update.updating);

routes.delete('/dream/:id', Dream.delete);

routes.get('/user', User.getAll);

routes.get('/user', User.getAll);

// rota para ver um unico usuario existente pelo id
routes.get('/user/:id', User.getById);

// rota para criar um novo usuario
routes.post('/user', User.create.validating, User.create.creating);

// rota para deletar um usuario
routes.delete('/user/:id', User.deleteById);

// rota para atualzar informações de um usuario pelo id
routes.put('/user/:id', User.update.validating, User.update.updating);

routes.get('/user/history/:id', Donate.allDonatesFromAUser);

module.exports = routes;
