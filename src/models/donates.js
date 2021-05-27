const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Dream = require('./dream');

class Donates extends Model { }

Donates.init({

    value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },

    dreamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Dream,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }

}, {
    sequelize,
    timestamps: true,
    modelName: 'Donates'
});




module.exports = Donates;