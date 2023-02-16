const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');
  const {Item} = require('./Items')

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });

    test('can create a Menu', async () => {
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });

    test('can find Menus', async () => {
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });
})

describe('Restaurant and Menu association', () => {
    test('Restaurant.hasMany(Menu) creates a menu for a restaurant', async () => {
      // Create a restaurant and a menu
      const restaurant = await Restaurant.create({ name: 'Test Restaurant' });
      const menu = await Menu.create({ name: 'Test Menu', RestaurantId: restaurant.id });
  
      // Check that the menu belongs to the restaurant
      expect(menu.RestaurantId).toBe(restaurant.id);
  
      // Check that the restaurant has the menu
      const menus = await restaurant.getMenus();
      expect(menus.length).toBe(1);
      expect(menus[0].name).toBe('Test Menu');
    });
  
    test('Menu.belongsTo(Restaurant) sets the restaurant for a menu', async () => {
      // Create a restaurant and a menu
      const restaurant = await Restaurant.create({ name: 'Test Restaurant' });
      const menu = await Menu.create({ name: 'Test Menu' });
  
      // Associate the menu with the restaurant
      await menu.setRestaurant(restaurant);
  
      // Check that the menu belongs to the restaurant
      expect(menu.RestaurantId).toBe(restaurant.id);
  
      // Check that the restaurant has the menu
      const menus = await restaurant.getMenus();
      expect(menus.length).toBe(1);
      expect(menus[0].name).toBe('Test Menu');
    });
  });


  describe('Menu and Item association', () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true }); // Drop and re-create all tables
    });
  
    test('Menu.belongsToMany(Item) and Item.belongsToMany(Menu) create an association table', async () => {
      // Create a menu and some items
      const menu = await Menu.create({ name: 'Test Menu' });
      const item1 = await Item.create({ name: 'Test Item 1' });
      const item2 = await Item.create({ name: 'Test Item 2' });
  
      // Associate the items with the menu
      await menu.addItems([item1, item2]);
  
      // Check that the items belong to the menu
      const items = await menu.getItems();
      expect(items.length).toBe(2);
      expect(items[0].name).toBe('Test Item 1');
      expect(items[1].name).toBe('Test Item 2');
  
      // Check that the menu belongs to the items
      const menus1 = await item1.getMenus();
      expect(menus1.length).toBe(1);
      expect(menus1[0].name).toBe('Test Menu');
      const menus2 = await item2.getMenus();
      expect(menus2.length).toBe(1);
      expect(menus2[0].name).toBe('Test Menu');
    });
  });


  describe('Eager loading of Menus and their Items', () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true }); // Drop and re-create all tables
  
      // Create some menus and items
      const menu1 = await Menu.create({ name: 'Menu 1' });
      const item1 = await Item.create({ name: 'Item 1' });
      await menu1.addItems(item1);
  
      const menu2 = await Menu.create({ name: 'Menu 2' });
      const item2 = await Item.create({ name: 'Item 2' });
      const item3 = await Item.create({ name: 'Item 3' });
      await menu2.addItems([item2, item3]);
    });
  
    test('find all Menus and their Items', async () => {
      // Find all menus and include their items
      const menus = await Menu.findAll({
        include: [{ model: Item }],
      });
  
      // Check that the menus and their items were loaded correctly
      expect(menus.length).toBe(2);
      expect(menus[0].name).toBe('Menu 1');
      expect(menus[0].Items.length).toBe(1);
      expect(menus[0].Items[0].name).toBe('Item 1');
      expect(menus[1].name).toBe('Menu 2');
      expect(menus[1].Items.length).toBe(2);
      expect(menus[1].Items[0].name).toBe('Item 2');
      expect(menus[1].Items[1].name).toBe('Item 3');
    });
  });