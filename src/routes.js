const express = require('express');

const routes = express.Router();
const multer = require('multer');
const Dream = require('./controllers/dreamController');
const User = require('./controllers/userController');
const Donate = require('./controllers/donateController');
const multerConfig = require('./config/multer');
const Index = require('./config/firebase/firebaseStorage');
const ensureAuthentication = require('./middlewares/ensureAuthentication');

// Rota para fazer uma doação
routes.post('/donate', ensureAuthentication, Donate.donating);

// Rota para mostrar historico de doações que um sonho recebeu
routes.get('/dream/history/:id', Donate.allDonatesInADream);

//Rota para pegar todos os sonho
routes.get('/dream', Dream.get);

//Rota para pegar todos os sonhos de um usuario
routes.get('/dream/userdream/:userid', Dream.searchDreamUser);

//Rota para pegar um sonho pelo id
routes.get('/dream/:id', Dream.getOne);

//Rota para pegar um sonho pelo titulo
routes.get('/dream/search/:title/:page', Dream.getTitle);

//Rota para criar um novo sonho
routes.post('/dream', Dream.create.validating, Dream.create.creating);

//Rota para atualizar um sonho
routes.put('/dream/:id', Dream.update.validating, Dream.update.updating);

//Rota para deletar um usuario
routes.delete('/dream/:id', Dream.delete);

//Rota para adicioar uma imagem ao sonho
routes.post(
  '/dream/picture/:id',
  multer(multerConfig).single('imagem'),
  Index.uploadImage,
  Dream.updatePic,
);

//Rota para pegar todos os usuarios
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
// rota para hospedar foto de perfil do usuario na nuvem e atribuir o link no banco
routes.post(
  '/user/profile/:id',
  multer(multerConfig).single('imagem'),
  Index.uploadImage,
  User.updatePic,
);

module.exports = routes;
