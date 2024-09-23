const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('mysql://root:Nelson@140203@localhost:3306/Investigacion', {
    dialect: 'mysql',
});

module.exports = sequelize;

