const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model { }

User.init({
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  login: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  coins: {
    type: DataTypes.STRING,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: "User"
});

module.exports = User;
