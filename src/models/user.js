const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model { }

User.init({

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  coins: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 1000.0,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'User',
});

module.exports = User;
