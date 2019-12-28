var express = require('express');
var router = express.Router();
var blogControllers = require('../controllers/blog');
var app = express();
app.use(express.static(__dirname + '/public'));
router.get('/', blogControllers.Load);
module.exports = router;