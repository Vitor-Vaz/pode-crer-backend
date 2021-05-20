const Dream = require('../models/dream');

module.exports = {

  async get(req, res) {
    const dreams = await Dream.findAll();

    res.send(dreams);
  },

  async getOne(req, res) {
    const { id } = req.params;

    const dream = await Dream.findOne({
      where: {
        id,
      },
    });
    res.send(dream);
  },

  async getName(req, res) {
    const { name } = req.params;

    try {
      const dream = await Dream.findOne({
        where: {
          name,
        },
      });
      if (!dream) {
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
    } = req.body;

    const dream = await Dream.create({
      name, description,
    });

    res.send(dream);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      description,
    } = req.body;

    try {
      const dream = await Dream.findByPk(id);
      if (!dream) {
        throw new Error('Sonho não existe');
      }

      dream.name = name;
      dream.description = description;

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
