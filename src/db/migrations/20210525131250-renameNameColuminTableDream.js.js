const sequelize = require('sequelize');

module.exports = {
    /**
   * @param {sequelize.QueryInterface} queryInterface
   */

  up: async (queryInterface, Sequelize) => {

    await queryInterface.renameColumn('dreams', 'name', 'title');
  },

  /**
   * @param {sequelize.QueryInterface} queryInterface
   */

  down: async (queryInterface) => {
    await queryInterface.renameColumn('dreams', 'title', 'name');
  }
};
