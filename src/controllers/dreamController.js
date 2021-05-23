const { Op } = require('sequelize');
const { body, validationResult} = require ('express-validator')
const Dream = require('../models/dream');

module.exports = {

  async get(req, res) {
    
    try{
      const dreams = await Dream.findAll();

      if(!dreams.length){
        throw new Error("Não foram encontrado registros de sonhos");
      }

      res.send(dreams);
    }catch(error){
      res.send({error: error.message});
    }


    //res.send(dreams);
  },

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const dream = await Dream.findByPk(id);

      if (!dream) {
        throw new Error(`não foi encontrado nenhum sonho com o id: ${id}`);
      }

      res.send(dream);
    } catch (error) {
      res.send({ error: error.message });
    }
  },

  async getName(req, res) {
    const { name, page } = req.params;

    try {
      const dream = await Dream.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },

        },
        limit: 3,
        offset: (page - 1) * 3,
      });
      if (!dream.length) {
        throw new Error('nome do sonho não encontrado');
      }

      res.send(dream);
    } catch (error) {
      res.send({ error: error.message });
    }
  },

  create: {
    validating: [
      body('name').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isString().withMessage('Esse campo não aceita números'),  
      body('description').notEmpty().withMessage('O preenchimento desse campo é obrigatório!'),
      body('resume').optional().isString().withMessage('O preenchimento desse campo não é obrigatório!'),
      body('goal').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isDecimal().withMessage('Esse campo só aceita números!').isLength({min:2}).withMessage('O valor minimo é de R$10'),
      body('userId').notEmpty().withMessage('O preenchimento desse campo é obrigatório!').isNumeric().withMessage('Esse campo só aceita números!')

    ],

    creating: async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
      }
      try {
        const {
          name,
          description,
          resume,
          goal,
          userId,
        } = req.body;

        const dream = await Dream.create({
          name, description, resume, goal, userId,
        });

        return res.send ({ 
          dream
        });

      } catch (error) {
        return res.status(400).send({e: error.message});
      }
    },
  },
  

  update:{
    validating: [
      body('name').optional().isString().notEmpty().isLength({min: 7}).withMessage('Formato inválido, de mais informações para o seu título!'),
      body('description').optional().isString().withMessage('Esse campo não aceita números!'),
      body('resume').optional().isString().withMessage('Esse campo não aceita números!'),
      body('goal').optional().isDecimal().withMessage('Esse campo só aceita números!').isLength({min:2}).withMessage('O valor minimo é R$10'),
    ],

    updating: async(req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { id } = req.params;
      const {
        name,
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
        
        res.send({ mensagem: 'Sonho atualizado com sucesso'});
      } catch (error) {
        res.send({ error: error.message });
      }
    },
  },

  async delete(req, res) {
    const { id } = req.params;
    try {

      const dream = await Dream.findByPk(id);
      if(!dream){
        throw new Error("id não encontrado")
      }

      await dream.destroy();
      res.send({ mensagem: 'Sonho deletado com sucesso' });
    } catch (error) {
      res.status(400).send({error:error.message});
    }
  },

};
