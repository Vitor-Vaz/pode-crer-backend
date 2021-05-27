const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');

class User extends Model {}

User.init(
  {
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
    password: {
      type: DataTypes.VIRTUAL,
    },
    password_hash: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'User',
  },
);

User.beforeSave(async (user) => {
  if (user.password) {
    // eslint-disable-next-line no-param-reassign
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});

module.exports = User;
