// dependencies
require('dotenv').config(); require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// use cors with options
app.use(
	cors({
		origin: process.env.FRONT_URL,
		credentials: true,
	}),
);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
	// Handle file upload, e.g., save file path to database
	res.status(200).send('File uploaded successfully');
});

app.get('/images', (req, res) => {
	const uploadDirectory = 'public/uploads/';

	// Read the contents of the uploads directory
	fs.readdir(uploadDirectory, (err, files) => {
		if (err) {
			console.error('Error reading upload directory:', err);
			res.status(500).json({ error: 'Internal Server Error' });
			return;
		}

		// Filter out non-image files if needed
		const imageFiles = files.filter((file) =>
			/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(file),
		);

		// Create an array of objects with filenames
		const imageList = imageFiles.map((filename) => ({ filename }));

		res.json(imageList);
	});
});

app.delete('/images/:filename', (req, res) => {
	const filename = req.params.filename;
	const filePath = path.join(__dirname, 'public/uploads/', filename);

	// Delete the file from the uploads directory
	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Error deleting file:', err);
			res.status(500).json({ error: 'Internal Server Error' });
			return;
		}

		res.json({ success: true });
	});
});

// auth
app.post('/sigup', userController.signup);
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

// Orders
app.get('/orders', requireAuth, ordersController.fetchOrders);
app.post('/orders', requireAuth, ordersController.createOrders);

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
initDatabaseConnection(db)
	.then(() => {
		// Connection successful, start the server
		startServer();
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});