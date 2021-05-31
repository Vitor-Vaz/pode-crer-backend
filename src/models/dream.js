const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

class Dream extends Model { }

Dream.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  resume: {
    type: DataTypes.STRING(5000),
  },
  goal: {
    type: DataTypes.DECIMAL,
  },
  reached: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0.0,
  },
  picture: {
    type: DataTypes.STRING,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Dream',
});

Dream.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Dream;
