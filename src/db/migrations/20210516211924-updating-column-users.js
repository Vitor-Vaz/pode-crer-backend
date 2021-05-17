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
      'users',
      'avatar',
      {
        type: Sequelize.DataTypes.STRING,
      },
      'login',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      'password',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      'coins',
      {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    );
  },
  /**
   * @param {sequelize.QueryInterface} QueryInterface
   */
  down: async (QueryInterface) => {
    await QueryInterface.removeColumn(
      'users',
      'avatar',
      'password',
      'login',
      'coins',
    );
  },
};
