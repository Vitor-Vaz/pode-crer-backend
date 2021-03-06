const { Op } = require('sequelize');
const Donates = require('../models/donates');
const Dream = require('../models/dream');
const Users = require('../models/user');
const AppError = require('../helper/AppError');

module.exports = {
  async donating(req, res) {
    const { userId, dreamId, value } = req.body;
    try {
      const user = await Users.findByPk(userId);

      if (!user) {
        throw new AppError({
          message: 'Usuario não encontrado na base de dados',
          statusCode: 404,
        });
      }

      if (value > user.coins) {
        throw new AppError({
          message:
            'Não foi possivel fazer doação, valor de créditos insuficiente!',
          statusCode: 400,
        });
      }

      if (value <= 0) {
        throw new AppError({
          message: 'O valor da doação deve ser maior do que zero',
          statusCode: 400,
        });
      }

      const dream = await Dream.findByPk(dreamId);

      if (!dream) {
        throw new AppError({
          message: 'Sonho não encontrado na base de dados',
          statusCode: 404,
        });
      }

      user.coins -= Number(value);
      await user.save();

      dream.reached += Number(value);
      await dream.save();

      const donate = await Donates.create({ userId, dreamId, value });

      res.send(donate);
    } catch (err) {
      res.status(err.statusCode).send({ message: err.message });
    }
  },

  async allDonatesInADream(req, res) {
    const { id } = req.params;

    try {
      const donates = await Donates.findAll({
        where: {
          dreamId: `${id}`,
        },
      });

      if (!donates.length) {
        throw new AppError({
          message: 'Não foram encontrado registros de doações para esse sonho',
          statusCode: 404,
        });
      }

      res.send(donates);
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  },

  async allDonatesFromAUser(req, res) {
    const { id } = req.params;

    try {
      const donates = await Donates.findAll({
        where: {
          userId: `${id}`,
        },
        include: [{
          model: Dream,
          as: 'dream',
          attributes: ['title', 'picture'],
        }],
      });
      res.send(donates);
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message });
    }
  },
};
