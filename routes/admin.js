var express = require('express');
var router = express.Router();
var passport = require('passport')
var adminControllers = require('../controllers/admin');
/* GET home page. */
router.get('/',adminControllers.isAuth,adminControllers.loadEvents);
router.post('/',adminControllers.checkLogin);
router.get('/teams',adminControllers.loadTeams);
router.get('/logout',adminControllers.logout);
router.get('/add-event',adminControllers.isAuth,adminControllers.loadAdd);
router.post('/add-event',adminControllers.isAuth,adminControllers.postEvent);
router.get('/add-teams',adminControllers.isAuth,adminControllers.loadAddTeams);
router.post('/add-teams',adminControllers.isAuth,adminControllers.postTeams);
router.get('/products',adminControllers.isAuth,adminControllers.loadProducts);
router.get('/add-product',adminControllers.isAuth,adminControllers.addProduct);
router.post('/add-product',adminControllers.isAuth,adminControllers.postProduct);
router.post('/products/delete',adminControllers.isAuth,adminControllers.deleteProduct);
router.post('/event/delete',adminControllers.isAuth,adminControllers.deleteEvent);
router.get('/teams/edit/:id',adminControllers.isAuth,adminControllers.editTeams);
router.post('/teams/delete',adminControllers.isAuth,adminControllers.deleteTeams);
router.get('/event/edit/:id',adminControllers.isAuth,adminControllers.editEvent);
router.get('/teams/edit/:id',adminControllers.isAuth,adminControllers.editTeams);
router.get('/products/edit/:id',adminControllers.isAuth,adminControllers.editProduct);
router.post('/event/edit/:id',adminControllers.isAuth,adminControllers.updateEvent);
router.post('/teams/edit/:id',adminControllers.isAuth,adminControllers.updateTeams);
router.post('/products/edit/:id',adminControllers.isAuth,adminControllers.updateProduct);
router.get('/bill',adminControllers.isAuth,adminControllers.loadBill)
router.post('/bill/done',adminControllers.isAuth,adminControllers.doneBill)
router.post('/bill/delete',adminControllers.isAuth,adminControllers.deleteBill)
router.get('/image',adminControllers.isAuth,adminControllers.renderAdminImage)
router.post('/post-image',adminControllers.isAuth,adminControllers.uploadImage);

module.exports = router;
