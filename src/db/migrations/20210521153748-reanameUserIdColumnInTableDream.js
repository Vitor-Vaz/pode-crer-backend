const sequelize = require('sequelize');

module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface
   */
  up: async (queryInterface) => {
    await queryInterface.renameColumn('dreams', 'user_id', 'userId');
  },
  /**
   * @param {sequelize.QueryInterface} queryInterface
   */
  down: async (queryInterface) => {
    await queryInterface.renameColumn('dreams', 'userId', 'user_id');
  },
};
