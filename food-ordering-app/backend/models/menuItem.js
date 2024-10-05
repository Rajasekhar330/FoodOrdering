const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const MenuItem = sequelize.define('MenuItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    available_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sub_category: {
        type: DataTypes.STRING,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
});

module.exports = MenuItem;
