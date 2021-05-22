const sequelize = require('sequelize');

'use strict';

module.exports = {

  /**
  * @param {sequelize.QueryInterface} QueryInterface
  * @param {sequelize} Sequelize
  * 
  */


  up: async (QueryInterface, Sequelize) => {

    const date = new Date();


    await QueryInterface.bulkInsert('users', [
      {
        name: 'Vitor Vaz',
        email: "vitoralan@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 

      {
        name: 'Vitoria Souza',
        email: "VitoriaS@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 

      {
        name: 'josé santos',
        email: "jsantos@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 


      {
        name: 'maria betania',
        email: "mariazinha@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 

      {
        name: 'Carlos Algusto',
        email: "CarlosA@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 

      {
        name: 'Fatima Bernardes',
        email: "FBernardes@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 

      {
        name: 'Sandra Gonçalves',
        email: "GSandra@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 

      {
        name: 'Cintia Cruz',
        email: "CruzC@gmail.com",
        createdAt: date,
        updatedAt: date
      }, 

    ], {});

  },

  down: async (QueryInterface) => {


    await QueryInterface.bulkDelete('users', null, {});

  }
};
