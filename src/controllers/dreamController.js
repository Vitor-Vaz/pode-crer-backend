const Dream = require('../models/dream')

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

    const dream = await Dream.findOne({
      where: {
        name,
      },
    });
    res.send(dream);
  },

  async create(req, res) {
    const {
      name,
      descricao,
      resume,
      goal,
      
    } = req.body;

    const dream = await Dream.create({
      name, descricao,resume,goal
    });

    res.send(dream);
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      descricao,
      resume,
      goal,
      
    } = req.body;

    try {
      const dream = await Dream.findByPk(id);
      if (!dream) {
        throw new Error('Sonho não existe');
      }

      dream.name = name;
      dream.descricao = descricao;
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
