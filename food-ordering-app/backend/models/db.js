const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('food_ordering', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
