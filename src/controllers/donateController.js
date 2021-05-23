const { Op } = require('sequelize');
const Donates = require('../models/donates');
const Dream = require('../models/dream');
const Users = require('../models/user')


module.exports = {

    async donating(req, res) {
        const { userId, dreamId, value } = req.body;

        try {
            const user = await Users.findByPk(userId);

            if (value > user.coins) {
                throw new Error("Não foi possivel fazer doação, valor de créditos insuficiente!");
            }
            user.coins = user.coins - value;
            await user.save();


            const dream = await Dream.findByPk(dreamId);
            dream.reached = dream.reached + value;
            await dream.save();

            const donate = await Donates.create({ userId, dreamId, value });

            res.send(donate);



        } catch (err) {
            res.send({ err: err.message });
        }


    },


    async allDonatesInADream(req, res) {
        const id = req.params.id;

        try {
            const donates = await Donates.findAll({
                where: {
                    dreamId: {
                        [Op.like]: `${id}`
                    }
                }
            });

            if (!donates.length) {
                throw new Error("Não foram encontrado registros de doações para esse sonho");
            }

            res.send(donates)
        } catch (error) {
            res.send({ error: error.message })
        }


    },

    async allDonatesFromAUser(req, res) {

        const id = req.params.id;

        try {
            const donates = await Donates.findAll({
                where: {
                    userId: {
                        [Op.like]: `${id}`
                    }
                }
            });

            if (!donates.length) {
                throw new Error("Não foram encontrado registros de doações desse usuario");
            }
            res.send(donates)

        } catch (error) {
            res.send({ error: error.message })
        }




    }

}