const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');
const Dream = require('../models/dream');
const AppError = require('../helper/AppError')

module.exports = {

  async get(req, res) {
    try {
      const dreams = await Dream.findAll();

      if (!dreams.length) {
       throw new AppError('Não foram encontrado registros de sonhos', 400);
      }

      res.send(dreams);
    } catch (error) {
      res.send({error: error.status});
    } 
  },

  async searchDreamUser (req, res) {
    const idUser = req.params.userid;

    try {
      const dreamByUser = await Dream.findAll({
        where: {
          userId : idUser
        }
      });

      if (!dreamByUser.length) {
        throw new AppError({ message: `Esse usuario não tem sonhos cadastrados`})
      }
      res.send(dreamByUser)

    } catch (error) {
      res.status(400).send({error: error.message})
    }
  },
 
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const dream = await Dream.findByPk(id);

      if (!dream) {
         throw new AppError({ message: `Não foi encontrado nenhum sonho com o id ${id}`});
      }

      res.send(dream);

    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async getTitle(req, res) {
    const { title, page } = req.params;

    try {
      const dream = await Dream.findAll({
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },

        },
        limit: 3,
        offset: (page - 1) * 3,
      });
      if (!dream.length) {
        throw new Error('Título do sonho não encontrado');
      }

      res.send(dream);
    } catch (error) {
      res.send({ error: error.message });
    }
  },

  create: {
    validating: [
      body('title').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isString()
        .withMessage('Esse campo não aceita números'),
      body('description').notEmpty().withMessage('O preenchimento desse campo é obrigatório!'),
      body('resume').optional().isString().withMessage('O preenchimento desse campo não é obrigatório!'),
      body('goal').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isDecimal()
        .withMessage('Esse campo só aceita números!')
        .isLength({ min: 2 })
        .withMessage('O valor minimo é de R$10'),
      body('userId').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isNumeric()
        .withMessage('Esse campo só aceita números!'),

    ],

    creating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const {
          title,
          description,
          resume,
          goal,
          userId,
        } = req.body;

        const dream = await Dream.create({
          title, description, resume, goal, userId,
        });

        return res.send({
          dream,
        });
      } catch (error) {
        return res.status(400).send({ e: error.message });
      }
    },
  },

  update: {
    validating: [
      body('title').optional().isString().notEmpty()
        .isLength({ min: 7 })
        .withMessage('Formato inválido, de mais informações para o seu título!'),
      body('description').optional().isString().withMessage('Esse campo não aceita números!'),
      body('resume').optional().isString().withMessage('Esse campo não aceita números!'),
      body('goal').optional().isDecimal().withMessage('Esse campo só aceita números!')
        .isLength({ min: 2 })
        .withMessage('O valor minimo é R$10'),
    ],

    updating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const {
        title,
        description,
        resume,
        goal,

      } = req.body;
      try {
        const dream = await Dream.findByPk(id);
        if (!dream) {
          throw new Error('Sonho não existe');
        }

        await dream.update(req.body);

        res.send({ mensagem: 'Sonho atualizado com sucesso' });
      } catch (error) {
        res.send({ error: error.message });
      }
    },
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const dream = await Dream.findByPk(id);
      if (!dream) {
        throw new Error('id não encontrado');
      }

      await dream.destroy();
      res.send({ mensagem: 'Sonho deletado com sucesso' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

};
