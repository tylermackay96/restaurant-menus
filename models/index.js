const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Items')

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant)

Menu.belongsToMany(Item,{through: "union"});
Item.belongsToMany(Menu,{through: "union"});

module.exports = { Restaurant, Menu }
