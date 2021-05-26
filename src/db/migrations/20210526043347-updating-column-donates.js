const sequelize = require('sequelize');

'use strict';

module.exports = {

  /**
   * @param {sequelize.QueryInterface} queryInterface
   * 
   *  @param {sequelize} Sequelize
   */

  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('donates', 'userId', {
        onDelete: 'SET NULL'
      }),

      queryInterface.changeColumn('donates', 'dreamId', {
        onDelete: 'SET NULL'
      }),

    ]);

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all(
      [queryInterface.changeColumn('donates', 'dreamId', {
        onDelete: 'CASCADE'
      }

    
      ),
      queryInterface.changeColumn('donates', 'userId', {
        onDelete: 'CASCADE'
      })]
    );
  }
};