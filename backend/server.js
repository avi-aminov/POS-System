// dependencies
require('dotenv').config(); require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Import the database connection and Sequelize instance.
const db = require('./config/database');
const { initDatabaseConnection } = require('./connection');

//controllers
const requireAuth = require('./middleware/requireAuth');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const productsController = require('./controllers/productsController');
const customersController = require('./controllers/customersController');
const ordersController = require('./controllers/ordersController');
const imageController = require('./controllers/imageController');
const settingsController = require('./controllers/settingsController');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = [process.env.FRONT_URL, 'http://127.0.0.1:5173'];

// use cors with options
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	}),
);

// auth
app.post('/registration', userController.signup);
app.post('/login', userController.login);
app.get('/logout', userController.logout);
app.get('/check-auth', requireAuth, userController.checkAuth);

// categories
app.get('/categories', requireAuth, categoriesController.fetchCategories);
app.post('/add-category', requireAuth, categoriesController.addCategory);

// products
app.get('/products', requireAuth, productsController.fetchProducts);
app.post('/add-product', requireAuth, productsController.addProduct);
app.post('/update-product', requireAuth, productsController.updateProduct);

// Customers
app.get('/customers', requireAuth, customersController.fetchCustomers);
app.post('/customers', requireAuth, customersController.createCustomers);
app.put('/edit-customer', requireAuth, customersController.editCustomer);
app.delete('/delete-customer/:id', requireAuth, customersController.deleteCustomer);

// Orders
app.get('/orders', requireAuth, ordersController.fetchOrders);
app.post('/orders', requireAuth, ordersController.createOrders);

// Images
app.post('/upload', requireAuth, imageController.uploadFile);
app.get('/images', requireAuth, imageController.fetchImages);
app.delete('/images/:filename', requireAuth, imageController.deleteImage);

// Settings
app.get('/settings', requireAuth, settingsController.fetchSettings);
app.put('/update-settings/:key', requireAuth, settingsController.updateValueByKey);

// Create an async function to start the server.
const startServer = () => {
	app.listen(process.env.PORT, () => {
		console.log(
			`Server is up and running at: http://localhost:${process.env.PORT}`,
		);
	});
};

/**
 * Initialize the application by establishing the database connection.
 */
initDatabaseConnection(db).then(() => {
	// Connection successful, start the server
	startServer();
}).catch((error) => {
	console.error('Unable to connect to the database:', error);
});
