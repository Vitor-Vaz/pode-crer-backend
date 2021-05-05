const UserModel = require('../model/userModel')


module.exports = {

    async getAll(req, res) {

        const users = await UserModel.get();
        

        res.send(users);
    },


    async getById(req, res){

        const id = req.params.id
        try {
            const user = await UserModel.getOne(id);
            res.send(user); 

        } catch (error) {

            res.send("usuario não encontrado, log do erro: "+error);
            
        }
        

    }

}