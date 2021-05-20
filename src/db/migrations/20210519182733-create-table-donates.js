const sequelize = require('sequelize');

'use strict';


module.exports = {
  /**
  * @param {sequelize.QueryInterface} QueryInterface
  * @param {sequelize} Sequelize
  * 
  */


  up: async (QueryInterface, Sequelize) => {

    await QueryInterface.createTable('donates', {

      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      status: {
        type: Sequelize.DataTypes.ENUM('PENDING', 'DONE', 'CANCELED'),
        defaultValue: 'PENDING',
        allowNull: false,
      },

      value: {
        type: Sequelize.DataTypes.DECIMAL,
        defaultValue: 0.0,
        allowNull: false,
      },

      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Users', key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      dreamId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Dreams', key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await QueryInterface.dropTable('donates');

  }
};
