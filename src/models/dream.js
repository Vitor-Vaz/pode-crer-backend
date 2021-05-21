const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


class Dream extends Model { }

Dream.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    resume: {
        type: DataTypes.STRING,
    },
    goal: {
        type: DataTypes.DECIMAL,
    },
    reached: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0
    }

}, {
    sequelize,
    timestamps: true,
    modelName: 'Dream'
});




module.exports = Dream