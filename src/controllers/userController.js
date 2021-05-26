const firebase = require('firebase-admin');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const AppError = require('../helper/AppError');

module.exports = {
  async getAll(req, res) {

    try {
      const users = await User.findAll();
      if (!users) {
        throw new Error("não tem nenhum usuario")
      }
      res.send(users);
    } catch (error) {
      res.send(error)
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error(`não foi encontrado o usuario com o id: ${id}`);
      }
      res.send(user);
    } catch (error) {
      res.send({ error: error.message });
    }
  },

  create: {
    validating: [
      body('password').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isString().withMessage('Esse campo não aceita numeros'),
      body('email')
        .notEmpty()
        .withMessage('O preenchimento desse campo é obrigatório'),
      body('email').isString().withMessage('Esse campo não aceita numeros'),
    ],

    creating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { password, email, name } = req.body;
        const userAlreadyExists = await User.findOne({
          where: { email },
        });

        if (userAlreadyExists) {
          throw new Error('Esse usuário já existe!');
        }
        await User.create({
          email,
          name,
        });

        const { email: userEmail, uid: authId } = await firebase
          .auth()
          .createUser({
            email,
            password,
          });

        return res.send({
          email: userEmail,
          firebaseAuthId: authId,
        });
      } catch (error) {
        return res.status(400).send({ e: error.message });
      }
    },
  },

  async deleteById(req, res) {
    const { id } = req.params;
    try {
      const deleted = await User.findByPk(id);

      if (!deleted) {
        throw new AppError({message:"Usuario não existe na base de dados", statusCode:404});
      }

      deleted.destroy();
      res.send({ mensagem: 'usuário deletado com sucesso' });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  },

  update: {
    validating: [
      body('name')
        .notEmpty()
        .optional()
        .isString()
        .isLength({min: 3})
        .withMessage('Formato invalido ou pequeno demais, verifique se houve erro na digitação'),
      body('password')
        .notEmpty()
        .isString()
        .optional()
        .isLength({min: 7})
        .withMessage('Senha inválida, verifique novamente o formato'),
      body('email')
        .notEmpty()
        .isString()
        .optional()
        .isEmail()
        .withMessage('Formato inválido, verifique se seu email está correto'),
    ],

    updating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      try {
        const user = await User.findByPk(id);

        if (!user) {
          throw new AppError({message:'Usuario não existe', statusCode:404});
        }

        await user.update(req.body);

        res.send({ mensagem: 'usuário atualizado com sucesso' });
      } catch (error) {
        res.status(error.statusCode).send({ error: error.message });
      }
    },
  },


  async updatePic(req, res) {

    const { id } = req.params;


    try {

      const user = await User.findByPk(id);

      if (!user) {
        throw new AppError({message:`não foi encontrado o usuario com o id: ${id}`, statusCode: 404});
      }
      user.avatar = req.file.firebaseUrl;

      await user.save();

      res.send({ user });
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }


  }

};
