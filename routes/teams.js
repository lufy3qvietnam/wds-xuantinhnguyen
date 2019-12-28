var express = require('express');
var router = express.Router();
var teamsControllers = require('../controllers/teams');
var app = express();
app.use(express.static(__dirname + '/public'));

router.get('/', teamsControllers.Load);
module.exports = router;