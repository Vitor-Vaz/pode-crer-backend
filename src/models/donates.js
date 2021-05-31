const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Dream = require('./dream');

class Donates extends Model {}

Donates.init(
  {
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },

    dreamId: {
      type: DataTypes.INTEGER,
      references: {
        model: Dream,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'Donates',
  },
);

Donates.belongsTo(Dream, { foreignKey: 'dreamId', as: 'dream' });
Donates.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Donates;
