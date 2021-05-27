const express = require('express');

const routes = express.Router();
const multer = require('multer');
const Dream = require('./controllers/dreamController');
const User = require('./controllers/userController');
const Donate = require('./controllers/donateController');
const SessionController = require('./controllers/sessionController');
const multerConfig = require('./config/multer');
const Index = require('./config/firebase/firebaseStorage');
const ensureAuthentication = require('./middlewares/ensureAuthentication');

routes.post('/donate', ensureAuthentication, Donate.donating);

routes.get('/dream/history/:id', Donate.allDonatesInADream);

routes.get('/dream', Dream.get);

routes.get('/dream/userdream/:userid', Dream.searchDreamUser);

routes.get('/dream/:id', Dream.getOne);

routes.get('/dream/search/:title/:page', Dream.getTitle);

routes.post('/dream', Dream.create.validating, Dream.create.creating);

routes.put('/dream/:id', Dream.update.validating, Dream.update.updating);

routes.delete('/dream/:id', Dream.delete);

routes.post(
  '/dream/picture/:id',
  multer(multerConfig).single('imagem'),
  Index.uploadImage,
  Dream.updatePic,
);

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
// rota para hospedar foto de perfil do usuario na nuvem e atribuir o link no banco
routes.post(
  '/user/profile/:id',
  multer(multerConfig).single('imagem'),
  Index.uploadImage,
  User.updatePic,
);

routes.post('/session', SessionController.create);

routes.get('/', (req, res) => {
  res.render('./root');
});

module.exports = routes;
