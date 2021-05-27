// eslint-disable-next-line no-unused-vars
const sequelize = require('sequelize');

module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface
   * @param {sequelize} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'password_hash', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    });
  },
  /**
   * @param {sequelize.QueryInterface} queryInterface
   */
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'password_hash');
  },
};
