const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


class Dream extends Model { }

Dream.init({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Dream'
});




module.exports = Dream