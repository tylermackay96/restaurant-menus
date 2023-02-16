const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Menu model
class Menu extends Model {}
Menu.init({
  title: DataTypes.STRING
}, { sequelize, modelName: 'menu' });

module.exports = {Menu};