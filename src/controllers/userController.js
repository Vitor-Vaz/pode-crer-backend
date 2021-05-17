const User = require('../models/user');

module.exports = {

    async getAll(req, res) {

        const users = await User.findAll();


        res.send(users);
    },


    async getById(req, res) {

        const id = req.params.id

        const user = await User.findOne({
            where: {
                id: id
            }
        });
        res.send(user);


    },

    async create(req, res) {
        const {
            name,
            avatar,
            login,
            password,
            email
        } = req.body;

        const user = await User.create({ name, avatar, email, login, password, coins: 1000 });

        res.send(user);
    },

    async deleteById(req, res) {
        const id = req.params.id
        try {

            const deleted = await User.findOne({
                where: {
                    id: id
                }
            })

            deleted.destroy();
            res.send({ mensagem: 'usuário deletado com sucesso' })
        } catch (error) {
            res.send(error)
        }

    },

    async update(req, res) {
        const id = req.params.id
        const {
            name,
            avatar,
            login,
            password,
            email
        } = req.body;

        try {
            const user = await User.findByPk(id);
            if(!user){
                throw new Error("Usuario não existe")
            }

            user.name = name;
            user.avatar = avatar;
            user.login = login;
            user.password = password;
            user.email = email;


            await user.save()

            res.send({ mensagem: "usuário atualizado com sucesso" })
        } catch (error) {
            res.send({error: error.message});
        }
    }

}