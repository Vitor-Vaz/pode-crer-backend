const firebase = require('firebase-admin');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

module.exports = {
  async getAll(req, res) {
    const users = await User.findAll();

    res.send(users);
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
      body('password').notEmpty().withMessage('O preenchimento desse campo é obrigatório'),
      body('password').isString().withMessage('Esse campo não aceita numeros'),
      body('email').notEmpty().withMessage('O preenchimento desse campo é obrigatório'),
      body('email').isString().withMessage('Esse campo não aceita numeros'),
    ],

    creating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const {
          password,
          email,
        } = req.body;
        const userAlreadyExists = await User.findOne({
          where: { email },
        });

        if (userAlreadyExists) {
          throw new Error('User already existis');
        }
        await User.create({
          email, coins: 1000,
        });

        const { email: userEmail, uid: authId } = await firebase.auth().createUser({
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


    create: {

        validating: [

            body('name').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('name').isString().withMessage("Esse campo não aceita numeros"),
            body('password').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('password').isString().withMessage("Esse campo não aceita numeros"),
            body('email').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('email').isString().withMessage("Esse campo não aceita numeros"),

        ],

        creating: async (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            } else {

                const {
                    name,
                    avatar,
                    login,
                    password,
                    email
                } = req.body;

                const user = await User.create({ name, avatar, email, login, password});

                res.send(user);
            }
        }

        user.name = name;
        user.avatar = avatar;
        user.login = login;
        user.password = password;
        user.email = email;

        await user.save();

        return res.send({ mensagem: 'usuário atualizado com sucesso' });
      } catch (error) {
        return res.send({ error: error.message });
      }
    },


    update: {
        validating: [
            body('name').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('name').isString().withMessage("Esse campo não aceita numeros"),
            body('password').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('password').isString().withMessage("Esse campo não aceita numeros"),
            body('email').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('email').isString().withMessage("Esse campo não aceita numeros"),
        ],

        updating: async (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            } else {

                const id = req.params.id
                const {
                    name,
                    avatar,
                    login,
                    password,
                    email
                } = req.body;

                try {

                    await User.update(
                        {
                            name: name,
                            avatar: avatar,
                            login: login,
                            password: password,
                            email: email,
                        },
                        {
                            where: { id: id }
                        }
                    )

                    const user = await User.findByPk(id);
                    if (!user) {
                        throw new Error("Usuario não existe")
                    }

                    user.name = name;
                    user.avatar = avatar;
                    user.login = login;
                    user.password = password;
                    user.email = email;

                    await user.save()

                    res.send({ mensagem: "usuário atualizado com sucesso" })
                } catch (error) {
                    res.send({ error: error.message });
                }

            }
        }
    }


}
