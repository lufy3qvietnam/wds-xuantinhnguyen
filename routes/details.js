var express = require('express');
var router = express.Router();
var detailsControllers = require('../controllers/details');
var app = express();
app.use(express.static(__dirname + '/public'));
/* GET home page. */
router.get('/:id', detailsControllers.loadPost);
module.exports = router;