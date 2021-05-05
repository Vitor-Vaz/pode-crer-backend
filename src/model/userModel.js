const Database = require('../infra/config.js');

module.exports = {

    async get() {

        const db = await Database();

        const users = await db.all(`SELECT * FROM user`);

        await db.close();

        return users.map((user) => ({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            login: user.login,
            password: user.password,
            email: user.email,
            coins: user.coins
        }))
    },

    async getOne(id){

        const db = await Database();

        const user = await db.get(`SELECT * FROM user WHERE id = ${id}`)

        await db.close();

        return user;
    }

}