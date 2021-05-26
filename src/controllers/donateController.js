const { Op } = require('sequelize');
const Donates = require('../models/donates');
const Dream = require('../models/dream');
const Users = require('../models/user')
const AppError = require('../helper/AppError');

module.exports = {

    async donating(req, res) {
        const { userId, dreamId, value } = req.body;

        try {
            const user = await Users.findByPk(userId);

            if(!user){
                throw new AppError({ message: "Usuario não encontrado na base de dados", statusCode: 404 });
            }

            if (value > user.coins) {
                throw new AppError({ message: "Não foi possivel fazer doação, valor de créditos insuficiente!", statusCode: 203 });
            }

            const dream = await Dream.findByPk(dreamId);

            if(!dream){
                throw new AppError({ message: "Sonho não encontrado na base de dados", statusCode: 404 });
            }


            user.coins = user.coins - value;
            await user.save();

            dream.reached = dream.reached + value;
            await dream.save();

            const donate = await Donates.create({ userId, dreamId, value });

            res.send(donate);



        } catch (err) {
            res.status(err.statusCode).send({ err: err.message });
        }


    },


    async allDonatesInADream(req, res) {
        const id = req.params.id;

        try {
            const donates = await Donates.findAll({
                where: {
                    dreamId: `${id}`
                }
            });

            if (!donates.length) {
                throw new AppError({ message: "Não foram encontrado registros de doações para esse sonho", statusCode: 404 });
            }

            res.send(donates)
        } catch (error) {
            res.status(error.statusCode).send({ error: error.message })
        }

    },

    async allDonatesFromAUser(req, res) {

        const id = req.params.id;

        try {
            const donates = await Donates.findAll({
                where: {
                    userId: `${id}`
                }
            });

            if (!donates.length) {
                throw new AppError({ message: "Não foram encontrado registros de doações para esse usuario", statusCode: 404 });
            }
            res.send(donates)

        } catch (error) {
            res.status(error.statusCode).send({ error: error.message })
        }




    }

}