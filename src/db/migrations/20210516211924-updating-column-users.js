const { QueryInterface, DataTypes } = require("sequelize");

'use strict';

module.exports = {
  up: (QueryInterface, Sequelize) => {
     return QueryInterface.addColumn(
       'users',
       'avatar',{
          type: DataTypes.STRING,
       },
       'login', {
         type: DataTypes.STRING,
         allowNull: false
       },
       'password', {
         type: DataTypes.STRING,
         allowNull: false
       },
       'coins', {
         type: DataTypes.INTEGER,
         allowNull: false
       },
       );
  },

  down: (QueryInterface, Sequelize) => {
     return QueryInterface.removeColumn(
       'users',
       'avatar',
       'password',
       'login',
       'coins',
       );
  }
};
