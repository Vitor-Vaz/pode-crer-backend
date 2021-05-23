const sequelize = require('sequelize');

'use strict';

module.exports = {

/**
* @param {sequelize.QueryInterface} QueryInterface
* 
*/


  up: async (QueryInterface) => {


    const date = new Date();

    await QueryInterface.bulkInsert('dreams', [

      {
      name: 'comprar meu play 5"',
      description: "sou pobre me ajudem",
      resume: "uma história de vida muito  triste de um cara que quer um videogame chato pra crl meu Deus socorro estou desesperado para jogar o Demon Souls por que sou viciado na franquia souls like",
      goal: 5300,
      userId: 1,
      createdAt: date,
      updatedAt: date,
    },

    {
      name: "quero grana",
      description: "me ajudem",
      resume: "Estou precisando de ajuda não sei pra que, só quero ficar muito rico",
      goal: 10000,
      userId: 11,
      createdAt: date,
      updatedAt: date,
    },
  
    {
      name: "Cirurgia da Dona Josefa",
      description: "me ajudem",
      resume: "Olá, tudo bem? meu nome é Cintia e sou filha da dona Josefa, me cadastrei nesse site para pedir ajuda pois minha mãe sofre de uma doença grave na qual impede de se locomover e ela trabalha de diarista e não tem carteira assinada, a cirurgia e remedios para o tratamento custam 50000 reais, precisamos da ajuda de qualquer forma pois sem ela eu não sei me sustentar, pois sou sozinha",
      goal: 100000,
      userId: 8,
      createdAt: date,
      updatedAt: date,
    },
  
    {
      name: "Comprar meu saveiro",
      description: "Gostaria de ajuda para ter uma renda(leia a descrição",
      resume: "Sou o josé, pai de duas filhas e casado a 7 anos com maria que é empregada doméstica, fui prejudicado pela enchente que teve em alagoinhas, meu antigo saveiro foi levado e deu pt, usava ele para entregar itens de material de construção na região e hoje estou sem emprego visto que dependo do carro para exercer o serviço, poderiam me ajudar?",
      goal: 30000,
      userId: 3,
      createdAt: date,
      updatedAt: date,
    },
  
    {
      name: "Viagem para Paris",
      description: "Olá tudo bem? me chamo vitória....",
      resume: "Sim, você não leu errado, mas deixa eu te explicar melhor. Sou recém formada no ensino médio e participei de um concurso para futuros chefes de cozinha e consegui uma bolsa para estudar em uma escola de de paris, meu sonho sempre foi me tornar cozinheira e essa é a oportunidade da minha vida, infelizmente minha familia não tem muita renda para me manter lá por muito tempo, você pode me ajudar?",
      goal: 10000,
      userId: 4,
      createdAt: date,
      updatedAt: date,
    },

  
  ], {});

  },

  down: async (queryInterface) => {


    await queryInterface.bulkDelete('dreams', null, {});
  }
};
