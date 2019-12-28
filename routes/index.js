var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/index');
/* GET home page. */
router.get('/', indexControllers.loadIndex);
module.exports = router;