const { QueryInterface, DataTypes } = require("sequelize");

'use strict';

module.exports = {
  up: (QueryInterface, Sequelize) => {
     return QueryInterface.addColumn(
       'users',
       'password', {
         type: DataTypes.STRING,
         allowNull: false
       },
     )
  },

  down: (QueryInterface, Sequelize) => {
     return QueryInterface.removeColumn(
       'users',
       'password',
       );
  }
};
