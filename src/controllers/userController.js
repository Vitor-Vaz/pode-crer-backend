const UserModel = require('../model/userModel');

module.exports = {

  async getAll(req, res) {
    const users = await UserModel.get();

    res.send(users);
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.getOne(id);
      res.send(user);
    } catch (error) {
      res.send(`usuario não encontrado, log do erro: ${error}`);
    }
  },

  async create(req, res) {
    const { body } = req;
    try {
      UserModel.postUser(body);
      res.send({ mensagem: 'usuario inserido com sucesso' });
    } catch (error) {
      res.status(400).send({ error: 'usuario não cadastrado' });
    }
  },

  async deleteById(req, res) {
    const { id } = req.params;
    try {
      UserModel.delete(id);
      res.send({ mensagem: 'usuário deletado com sucesso' });
    } catch (error) {
      res.send(error);
    }
  },

  async putById(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      await UserModel.updateUser(body, id);
      res.send({ mensagem: 'usuário atualizado com sucesso' });
    } catch (error) {
      res.send(error);
    }
  },

};
