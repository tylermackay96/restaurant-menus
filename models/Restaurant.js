const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Restaurant model
class Restaurant extends Model {}
Restaurant.init({
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  cuisine: DataTypes.STRING,
  rating: DataTypes.INTEGER
}, { sequelize, modelName: 'restaurant' });


module.exports = {Restaurant};