const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');
const Dream = require('../models/dream');
const User = require('../models/user');
const AppError = require('../helper/AppError');

module.exports = {
  async get(req, res) {
    try {
      const dreams = await Dream.findAll({
        include: {
          model: User,
          as: 'user_id',
          attributes: ['name', 'avatar', 'email'],
        },
      });

      if (!dreams.length) {
        throw new AppError({message: 'Não foram encontrado registros de sonhos', statusCode: 400});
      }

      res.send(dreams);
    } catch (error) {
      res.status(error.statusCode).send({error: error.message});
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
        throw new AppError({ message: `Não foi encontrado nenhum sonho com o id ${id}`, statusCode:400 });
      }

      res.send(dream);

    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
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
        throw new AppError({message:`Nenhum sonho com o titulo ${title} foi encontrado`, statusCode:400});
      }

      res.send(dream);
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  },

  create: {
    validating: [
      body('title').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isString()
        .withMessage('Esse campo não aceita números'),
      body('description')
        .notEmpty()
        .withMessage('O preenchimento desse campo é obrigatório!'),
      body('resume')
        .optional()
        .isString()
        .withMessage('O preenchimento desse campo não é obrigatório!'),
      body('goal')
        .notEmpty()
        .withMessage('O preenchimento desse campo é obrigatório!')
        .isDecimal()
        .withMessage('Esse campo só aceita números!')
        .isLength({ min: 2 })
        .withMessage('O valor minimo é de R$10'),
      body('userId')
        .notEmpty()
        .withMessage('O preenchimento desse campo é obrigatório!')
        .isNumeric()
        .withMessage('Esse campo só aceita números!'),
    ],

    creating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const dream = await Dream.create(req.body);

        return res.send({dream});

      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
    },
  },

  update: {
    validating: [
      body('title').optional().isString().notEmpty()
        .isLength({ min: 7 })
        .withMessage(
          'Formato inválido, de mais informações para o seu título!',
        ),
      body('description')
        .optional()
        .isString()
        .withMessage('Esse campo não aceita números!'),
      body('resume')
        .optional()
        .isString()
        .withMessage('Esse campo não aceita números!'),
      body('goal')
        .optional()
        .isDecimal()
        .withMessage('Esse campo só aceita números!')
        .isLength({ min: 2 })
        .withMessage('O valor minimo é R$10'),
    ],

    updating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      try {
        const dream = await Dream.findByPk(id);
        if (!dream) {
          throw new AppError({message: 'Sonho não existe', statusCode: 400} );
        }

        await dream.update(req.body);

        res.send({ mensagem: 'Sonho atualizado com sucesso' });
      } catch (error) {
        res.status(error.statusCode).send({ error: error.message });
      }
    },
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const dream = await Dream.findByPk(id);
      
      if (!dream) {
        
        throw new AppError({message: 'Ops! parece que você tentou deletar um sonho inexistente!', statusCode: 400});
      }
      
      dream.destroy();
      res.send({ mensagem: 'Sonho deletado com sucesso' });
    } catch (error) {
      
      res.status(error.statusCode).send({ error: error.message });
    }
  },

  async updatePic(req, res) {

    try {
      const { id } = req.params;

      const dream = await Dream.findByPk(id);

      if (!dream) {
        throw new AppError({message: `não foi encontrado o sonho com o id: ${id}`, statusCode: 400});
      }

      dream.picture = req.file.firebaseUrl;

      await dream.save();

      res.send({ dream });

    } catch (err) {
      res.status(err.statusCode).send({ err: err.message });
    }
  }

};
