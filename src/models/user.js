const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db")

class User extends Model {}

User.init({
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  saldo: {
    type: DataTypes.DECIMAL,
  },
}, {
    sequelize,
    timestamps: true,
    modelName: "User"
});

module.exports = User;
