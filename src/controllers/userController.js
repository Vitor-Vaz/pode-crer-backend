const User = require('../models/user');
const { body, validationResult } = require('express-validator');

module.exports = {

    async getAll(req, res) {

        const users = await User.findAll();


        res.send(users);
    },


    async getById(req, res) {

        const id = req.params.id

        try{
            const user = await User.findByPk(id);

            if(!user){
                throw new Error(`não foi encontrado o usuario com o id: ${id}`)
            }
            res.send(user);
        }catch(error){
            res.send({error: error.message})
        }

    },


    create: {

        validating: [
            body('name').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('name').isString().withMessage("Esse campo não aceita numeros"),
            body('avatar').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('avatar').isString().withMessage("Esse campo não aceita numeros"),
            body('login').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('login').isString().withMessage("Esse campo não aceita numeros"),
            body('password').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('password').isString().withMessage("Esse campo não aceita numeros"),
            body('email').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('email').isString().withMessage("Esse campo não aceita numeros"),

        ],

        creating: async (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            } else {

                const {
                    name,
                    avatar,
                    login,
                    password,
                    email
                } = req.body;

                const user = await User.create({ name, avatar, email, login, password, coins: 1000 });

                res.send(user);
            }
        }
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


    update: {
        validating: [
            body('name').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('name').isString().withMessage("Esse campo não aceita numeros"),
            body('avatar').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('avatar').isString().withMessage("Esse campo não aceita numeros"),
            body('login').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('login').isString().withMessage("Esse campo não aceita numeros"),
            body('password').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('password').isString().withMessage("Esse campo não aceita numeros"),
            body('email').notEmpty().withMessage("O preenchimento desse campo é obrigatório"),
            body('email').isString().withMessage("Esse campo não aceita numeros"),
        ],

        updating: async (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.status(400).json({ errors: errors.array() });
            } else {

                const id = req.params.id
                const {
                    name,
                    avatar,
                    login,
                    password,
                    email
                } = req.body;

                try {

                    await User.update(
                        {
                            name: name,
                            avatar: avatar,
                            login: login,
                            password: password,
                            email: email,
                        },
                        {
                            where: { id: id }
                        }
                    )

                    const user = await User.findByPk(id);
                    if (!user) {
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
                    res.send({ error: error.message });
                }

            }
        }
    }


}
