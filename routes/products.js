var express = require('express');
var router = express.Router();
var productsControllers = require('../controllers/products');
router.post('/add', productsControllers.addToMarket);
router.post('/remove', productsControllers.removeFromCart);

module.exports = router;