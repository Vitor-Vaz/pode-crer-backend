// eslint-disable-next-line no-unused-vars
const sequelize = require('sequelize');

module.exports = {
  /**
 *
 * @param {sequelize.QueryInterface} QueryInterface
 * @param {sequelize} Sequelize
 */

  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.addColumn(
      'dreams',
      'picture',
      {
        type: Sequelize.DataTypes.STRING,
      },
    );
  },

  down: async (QueryInterface) => {
    await QueryInterface.removeColumn(
      'dreams',
      'picture',
    );
  }
};
