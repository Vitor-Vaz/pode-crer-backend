


module.exports = {

    async get(req, res) {

        const dreams = await Dream.getDreams();

        res.send(dreams);
    },

    async getOne(req, res) {

        const id = req.params.id;

        const dream = await Dream.getOneDream(id);

        res.send(dream);

    },

    async getName(req, res) {
        const name = req.body.search;
        console.log(name)

        const dream = await Dream.getOneDreamByName(name);

        res.send(dream)
    },

    async create(req, res) {

        const date = Date.now();


        const dream = {
            name: req.body.name,
            description: req.body.description,
            goal: req.body.goal,
            date_creation: date
        }

        await Dream.createDream(dream);

        res.send("sonho criado");

    },

    async update(req, res) {

        const id = req.params.id;

        const dream = {
            name: req.body.name,
            description: req.body.description,
            goal: req.body.goal
        }

        await Dream.updateDream(dream, id);

        res.send("sonho atualizado");

    },

    async delete(req, res) {

        const id = req.params.id;

        await Dream.deleteDream(id);

        res.send("sonho deletado");

    }

}

