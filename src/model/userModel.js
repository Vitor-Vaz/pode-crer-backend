const Database = require('../infra/config.js');

module.exports = {

  async get() {
    const db = await Database();

    const users = await db.all('SELECT * FROM user');

    await db.close();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      login: user.login,
      password: user.password,
      email: user.email,
      coins: user.coins,
    }));
  },

  async getOne(id) {
    const db = await Database();

    const user = await db.get(`SELECT * FROM user WHERE id = ${id}`);

    await db.close();

    return user;
  },

  async postUser(newuser) {
    const db = await Database();

    await db.run(`INSERT INTO user(
            name, 
            avatar, 
            login, 
            password, 
            email, 
            coins
            ) VALUES (
            "${newuser.name}", 
            "${newuser.avatar}", 
            "${newuser.login}", 
            "${newuser.password}", 
            "${newuser.email}", 
            1000)
            `);

    await db.close();
  },

  async delete(id) {
    const db = await Database();

    await db.run(`DELETE FROM user WHERE id = ${id}`);

    await db.close();
  },

  async updateUser(newUser, id) {
    const db = await Database();

    await db.run(`UPDATE user SET 
        name = "${newUser.name}", 
        avatar = "${newUser.avatar}", 
        login = "${newUser.login}", 
        password = "${newUser.password}", 
        email = "${newUser.email}" 
        WHERE id = ${id}`);

    await db.close();
  },

};
