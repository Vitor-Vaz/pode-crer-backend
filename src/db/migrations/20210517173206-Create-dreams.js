// eslint-disable-next-line no-unused-vars
const sequelize = require('sequelize');

module.exports = {

    /**
   * @param {sequelize.QueryInterface} QueryInterface
   * @param {sequelize} Sequelize
   */
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('dreams', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },  

    /**
   * @param {QueryInterface} QueryInterface
   */
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('dreams');
  },
};
