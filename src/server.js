require("./config/firebase");
require("./config/db");
const express = require("express");
const server = express();
const UserModel = require("./models/user")

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//codigo de EXEMPLO
server.get('/',async(_,__,next) => {
  const user = await UserModel.create({
    name: "teste",
    email: "teste@email.com"
  })
  user.save();
  next()
})


server.listen(
  8001,
  console.log("Aplicação ligada! acesse-a pelo link http://localhost:8001/")
);
