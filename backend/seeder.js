// Import necessary modules and models
const sequelize = require('./config/database');
//const Categories = require('./models/Categories');
//const Products = require('./models/Products');
//const Customers = require('./models/Customers');
//const Settings = require('./models/Settings');
// ... other model imports

const categories_data = require('./utils/data/categories');
const products_data = require('./utils/data/products');
const customers_data = require('./utils/data/customers');
const settings_data = require('./utils/data/settings');

sequelize
	.sync({ force: true }) // This will recreate tables, be careful in a production environment
	.then(async () => {
		try {
			// Seed data for Categories
			//await Categories.bulkCreate(categories_data);

			// Seed data for Products
			//await Products.bulkCreate(products_data);

			// Seed data for Customers
			//await Customers.bulkCreate(customers_data);

			// Seed data for Settings
			//await Settings.bulkCreate(settings_data);
		} catch (error) {
			console.error('Error seeding data:', error);
		} finally {
			// Close the database connection
			sequelize.close();
		}
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
