const Database = require('../infra/config');

module.exports = {


    async getDreams() {

        const db = await Database();

        const dreams = await db.all('SELECT * FROM dream');

        await db.close();

        return dreams
    },

    async getOneDream(id) {

        const db = await Database();

        const dream = await db.get(`SELECT * FROM dream WHERE id = ${id}`);

        await db.close();

        return dream
    },

    async getOneDreamByName(name) {
        const db = await Database();

        const dream = await db.all(`SELECT * FROM dream WHERE name LIKE "${name}%"`)

        await db.close()

        return dream
    }
    ,

    async createDream(dream) {

        const db = await Database();

        await db.run(`INSERT INTO dream(
            name,
            description,
            donates,
            goal,
            created_at
        ) VALUES(
            "${dream.name}",
            "${dream.description}",
            0,
            ${dream.goal},
            "${dream.date_creation}"
        ) `)

        await db.close();


        //1991
    },

    async updateDream(dream, id) {

        const db = await Database();

        await db.run(`UPDATE dream SET
        name = "${dream.name}",
        description = "${dream.description}"
        WHERE id = ${id}
        `)

        await db.close();

    },

    async deleteDream(id){

        const db = await Database();

        await db.run(`DELETE FROM dream WHERE id = ${id}`)


        await db.close();
    }




}