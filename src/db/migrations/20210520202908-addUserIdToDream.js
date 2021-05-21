// eslint-disable-next-line no-unused-vars
const sequelize = require('sequelize');

module.exports = {
  /**
   *
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('dreams', 'user_id', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  /**
   * @param {sequelize.QueryInterface} queryInterface
   */
  down: async (queryInterface) => {
    await queryInterface.removeColumn('dreams', 'user_id');
  },
};
