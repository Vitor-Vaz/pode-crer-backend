// eslint-disable-next-line no-unused-vars
const sequelize = require("sequelize");

module.exports = {
  /**
   * @param {sequelize.QueryInterface} QueryInterface
   * @param {sequelize} Sequelize
   */

  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.addColumn("dreams", "resume", {
      type: Sequelize.DataTypes.STRING(5000),
    });

    await QueryInterface.addColumn("dreams", "goal", {
      type: Sequelize.DataTypes.DECIMAL,
    });
    
    await QueryInterface.addColumn("dreams", "reached", {
      type: Sequelize.DataTypes.DECIMAL,
      defaultValue: 0.0
    });
  },

  /**
   *
   * @param {sequelize.QueryInterface} QueryInterface
   */

  down: async (QueryInterface, Sequelize) => {
    await QueryInterface.removeColumn("dreams", "resume");
    await QueryInterface.removeColumn("dreams", "goal");
    await QueryInterface.removeColumn("dreams", "reached");
  },
};
