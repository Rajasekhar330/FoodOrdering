const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Order;
