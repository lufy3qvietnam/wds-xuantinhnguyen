var express = require('express');
var router = express.Router();
var checkoutControllers = require('../controllers/checkout');
/* GET home page. */
router.post('/', checkoutControllers.checkout);
module.exports = router;