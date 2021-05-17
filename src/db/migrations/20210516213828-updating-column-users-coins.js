const { QueryInterface, DataTypes } = require("sequelize");

'use strict';

module.exports = {
  up: (QueryInterface, Sequelize) => {
     return QueryInterface.addColumn(
       'users',
       'coins', {
         type: DataTypes.INTEGER,
         allowNull: false
       },
     )
  },

  down: (QueryInterface, Sequelize) => {
     return QueryInterface.removeColumn(
       'users',
       'coins',
       );
  }
};