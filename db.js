const path = require('path');
const { Sequelize } = require('sequelize');

// TODO - connect to db via sequelize
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
  });


    module.exports = {
    sequelize
};
