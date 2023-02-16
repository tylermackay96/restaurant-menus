const {sequelize} = require('../db');
const { Sequelize } = require('sequelize');

// TODO - create a Item model
class Item extends Model {}
Item.init({
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.ITERGER,
  vegaterian: DataTypes.BOOLEAN

}, { sequelize, modelName: 'item' });

module.exports = {Item};