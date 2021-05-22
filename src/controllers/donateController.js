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


    async allDonates(req, res) {
        
    }


}