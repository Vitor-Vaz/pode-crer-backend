const { Op } = require('sequelize');
const Dream = require('../models/dream');

module.exports = {

  async get(req, res) {
    const dreams = await Dream.findAll();

    res.send(dreams);
  },

  async getOne(req, res) {
    const { id } = req.params;
    console.log('ai ai ai');
    try {
      const dream = await Dream.findByPk(id);

      if (!dream) {
        throw new Error(`não foi encontrado o sonho com o id: ${id}`);
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
        throw new Error('Sonho não encontrado');
      }

      res.send(dream);
    } catch (error) {
      res.send({ error: error.message });
    }
  },

  async create(req, res) {
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

    res.send(dream);
  },

  async update(req, res) {
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

      dream.name = name;
      dream.description = description;
      dream.resume = resume;
      dream.goal = goal;

      await dream.save();

      res.send({ mensagem: 'Sonho atualizado com sucesso' });
    } catch (error) {
      res.send({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Dream.findOne({
        where: {
          id,
        },
      });

      deleted.destroy();
      res.send({ mensagem: 'Dream deletado com sucesso' });
    } catch (error) {
      res.send(error);
    }
  },

};
