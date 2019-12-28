var express = require('express');
var router = express.Router();
var apiController = require('../controllers/api')
var cors = require('cors')
router.get('/',cors(),apiController.getProduct)

module.exports = router;