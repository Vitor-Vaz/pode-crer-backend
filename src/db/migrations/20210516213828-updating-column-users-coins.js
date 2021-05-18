// eslint-disable-next-line no-unused-vars
const sequelize = require('sequelize');

module.exports = {
  /**
   * @param {sequelize.QueryInterface} QueryInterface
   * @param {sequelize} Sequelize
   */
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.addColumn('users', 'coins', {
      type: Sequelize.DataTypes.INTEGER,
    });
  },
  /**
 * @param {sequelize.QueryInterface} QueryInterface
 */
  down: async (QueryInterface) => {
    await QueryInterface.removeColumn('users', 'coins');
  },
};
