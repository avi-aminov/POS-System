// routes.js
const express = require('express');
const router = express.Router();
//controllers
const requireAuth = require('./middleware/requireAuth');
const userController = require('./controllers/userController');
const settingsController = require('./controllers/settingsController');
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const imageController = require('./controllers/imageController');
const categoriesController = require('./controllers/categoriesController');
const customersController = require('./controllers/customersController');

module.exports = (app) => {
    // auth
    router.post('/registration', userController.signup);
    router.post('/login', userController.login);
    router.get('/logout', userController.logout);
    router.get('/check-auth', requireAuth, userController.checkAuth);

    // Settings
    router.get('/settings', requireAuth, settingsController.fetchSettings);
    router.put('/update-settings/:key', requireAuth, settingsController.updateValueByKey);
    router.put('/save-multiple-keys', requireAuth, settingsController.saveMultipleKeys);

    // products
    router.get('/products', requireAuth, productsController.fetchProducts);
    router.post('/add-product', requireAuth, productsController.addProduct);
    router.post('/update-product', requireAuth, productsController.updateProduct);
    router.post('/delete-product/:productId', requireAuth, productsController.updateProductIsDelete);

    // Orders
    router.get('/orders', requireAuth, ordersController.fetchOrders);
    router.post('/orders', requireAuth, ordersController.createOrders);

    // Images
    router.post('/upload', requireAuth, imageController.uploadFile);
    router.get('/images', requireAuth, imageController.fetchImages);
    router.delete('/images/:filename', requireAuth, imageController.deleteImage);

    // categories
    router.get('/categories', requireAuth, categoriesController.fetchCategories);
    router.post('/add-category', requireAuth, categoriesController.addCategory);
    router.post('/delete-category/:categoryId', requireAuth, categoriesController.updateCategoryIsDelete);

    // Customers
    router.get('/customers', requireAuth, customersController.fetchCustomers);
    router.post('/customers', requireAuth, customersController.createCustomers);
    router.put('/edit-customer', requireAuth, customersController.editCustomer);
    router.delete('/delete-customer/:id', requireAuth, customersController.deleteCustomer);

    return router;
};
