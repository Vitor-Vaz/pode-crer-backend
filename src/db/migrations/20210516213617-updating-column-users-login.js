const { QueryInterface, DataTypes } = require("sequelize");

'use strict';

module.exports = {
  up: (QueryInterface, Sequelize) => {
     return QueryInterface.addColumn(
       'users',
       'login', {
         type: DataTypes.STRING,
         allowNull: false
       },
     )
  },

  down: (QueryInterface, Sequelize) => {
     return QueryInterface.removeColumn(
       'users',
       'login',
       );
  }
};

