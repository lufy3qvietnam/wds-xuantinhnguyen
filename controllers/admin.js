var multer = require('multer');
var events = require('../models/events');
var products = require('../models/products');
var types = require('../models/productType');
var bill = require('../models/bill');
var teams = require('../models/teams');
var path = require('path');
var fs = require('fs')
var storageEvent = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, './public/img/post-image')
        },
        filename: function (req, file, cb) {
                cb(null, Date.now() + ".jpg")
        }
});
var storageProduct = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, './public/img/product-image')
        },
        filename: function (req, file, cb) {
                cb(null, Date.now() + ".jpg")
        }
});
var uploadPostImage = multer({
        storage: storageEvent
}).single('postImage');
var uploadProductImage = multer({
        storage: storageProduct
}).single('productImage');
module.exports.isAuth = function (req, res, next) {
        if (!req.session.user) {
                res.render('admin-login', {
                        err: ""
                })
        } else {
                next()
        }
}
module.exports.checkLogin = function (req, res, next) {
        body = req.body;
        if (body.username == 'ctv' && body.password == 'ctv') {
                req.session.user = 'ctv' + String(new Date().getTime());
                res.redirect('/admin/');
        } else {
                res.render('admin-login', {
                        err: 'Đăng nhập thất bại'
                })
        }
}
module.exports.logout = function (req, res, next) {
        req.session.destroy();
        res.redirect('/admin')
}
module.exports.loadAdd = function (req, res, next) {
        res.render('admin-add-event', {
                err: ''
        })
}
module.exports.postEvent = function (req, res, next) {
        uploadPostImage(req, res, function (err) {
                if (err) throw err;
                if (req.file === undefined) {
                        return res.render('admin-add-event', {
                                err: 'Không có hình ảnh'
                        })
                }
                data = req.body;
                imagePath = "/img/post-image/" + req.file.filename;
                events.create({
                        title: data.title,
                        shortDescription: data.shortDescription,
                        author: 'Admin',
                        timeOpen: data.timeOpen,
                        image: imagePath,
                        contacts: data.contacts,
                        description: data.description
                }, (err, event) => {
                        if (err) {
                                return res.render('admin-add-event', {
                                        err: 'Không thành công, xin thử lại'
                                })
                        }
                        res.redirect("/admin");
                })
        });
}
module.exports.loadEvents = function (req, res, next) {
        var outData = {}
        events.find((err, data) => {
                if (err) return res.render('admin-events', {
                        err: 'Không thể kết nối database'
                })
                else
                        outData = {
                                events: data
                        }
                res.render('admin-events', {
                        data: outData
                })
        })
}
module.exports.loadProducts = function (req, res, next) {
        var outData = {}
        products.find((err, data) => {
                if (err) return res.render('admin-products', {
                        err: 'Không thể kết nối database'
                })
                else
                        outData = {
                                products: data
                        }
                res.render('admin-products', {
                        data: outData
                })
        })
}
module.exports.addProduct = function (req, res, next) {
        res.render("admin-add-product")
}
module.exports.postProduct = function (req, res, next) {
        uploadProductImage(req, res, function (err) {
                if (req.file === undefined) {
                        return res.render('admin-add-product', {
                                err: 'Không có hình ảnh cho sản phẩm'
                        })
                }
                bodyData = req.body;
                imagePath = "/img/product-image/" + req.file.filename;
                type = (!bodyData.typeText) ? bodyData.type : bodyData.typeText;
                //save data to db
                types.findOne({
                        name: type
                }, (err, data) => {
                        //handle neu khong co name do
                        if (!data) {
                                types.create({
                                        name: type,
                                }, (err, data) => {
                                        products.create({
                                                name: bodyData.name,
                                                price: bodyData.price,
                                                available: true,
                                                type: data._id,
                                                typename: data.name,
                                                image: imagePath,
                                        }, (err, item) => {
                                                data.product.push(item._id);
                                                data.save((err) => {
                                                        if (err) return res.render('admin-add-products', {
                                                                err: 'Không thành công, xin thử lại'
                                                        })
                                                });
                                        })
                                })
                        } else {
                                products.create({
                                        name: type,
                                        price: bodyData.price,
                                        available: true,
                                        type: data._id,
                                        typename: data.name,
                                        image: imagePath,
                                }, (err, item) => {
                                        data.product.push(item._id);
                                        data.save((err) => {
                                                if (err) return res.render('admin-add-products', {
                                                        err: 'Không thành công, xin thử lại'
                                                })
                                        });
                                })
                        }
                        res.redirect('/admin/products');
                })
        });
}
module.exports.deleteProduct = function (req, res, next) {
        id = req.body.id;
        products.deleteOne({
                _id: id
        }, (err) => {
                if (err) {
                        return res.status(404).json({
                                success: false
                        })
                } else
                        return res.status(200).json({
                                success: true
                        })
        })
}
module.exports.deleteEvent = function (req, res, next) {
        id = req.body.id;
        events.deleteOne({
                _id: id
        }, (err) => {
                if (err) {
                        return res.status(404).json({
                                success: false
                        })
                } else
                        return res.status(200).json({
                                success: true
                        })
        })
}
module.exports.editEvent = function (req, res, next) {
        id = req.params.id;
        events.findOne({
                _id: id
        }, (err, event) => {
                res.render('admin-edit-event', {
                        data: event
                })
        })
}
module.exports.editProduct = function (req, res, next) {
        id = req.params.id;
        products.findOne({
                _id: id
        }, (err, product) => {
                res.render('admin-edit-product', {
                        data: product
                })
        })
}
module.exports.updateEvent = function (req, res, next) {
        uploadPostImage(req, res, function (err) {
                bodyData = req.body;
                id = req.params.id;
                events.findOne({
                        _id: id
                }, (err, event) => {
                        event.update({
                                title: (event.title !== bodyData.title) ? bodyData.title : event.title,
                                shortDescription: (event.shortDescription !== bodyData.shortDescription) ? bodyData.shortDescription : event.shortDescription,
                                image: (req.file === undefined) ? event.image : "/img/post-image/" + req.file.filename,
                                timeOpen: (!bodyData.timeOpen) ? event.timeOpen : bodyData.timeOpen,
                                contacts: (event.contacts !== bodyData.contacts) ? bodyData.contacts : event.contacts,
                                description: (event.description !== bodyData.description) ? bodyData.description : event.description,
                        }, (err) => {
                                if (err) {
                                        if (err) return res.render('admin-edit-event', {
                                                err: 'Không thành công, xin thử lại'
                                        })
                                }
                                res.redirect('/admin');
                        })
                })
        })
}
module.exports.updateProduct = function (req, res, next) {
        uploadProductImage(req, res, function (err) {
                bodyData = req.body;
                id = req.params.id;
                products.findOne({
                        _id: id
                }, (err, item) => {
                        item.update({
                                name: (item.name !== bodyData.name) ? bodyData.name : item.name,
                                price: (item.price !== bodyData.price) ? bodyData.price : item.price,
                                image: (req.file === undefined) ? item.image : "/img/product-image/" + req.file.filename,
                        }, (err) => {
                                if (err) return res.render('admin-edit-products', {
                                        err: 'Không thành công, xin thử lại'
                                })
                                res.redirect('/admin/products');
                        })
                })
        })
}

module.exports.deleteBill = function (req, res, next) {
        id = req.body.id;
        bill.deleteOne({
                _id: id
        }, (err) => {
                if (err) {
                        return res.status(404).json({
                                success: false
                        })
                } else
                        return res.status(200).json({
                                success: true
                        })
        })
}

module.exports.doneBill = function (req, res, next) {
        var id = req.body.id;
        bill.findOne({
                _id: id
        }, (err, data) => {
                data.update({
                        done: true
                }, (err) => {
                        if (err) return res.status(200).json({
                                success: false,
                                err: "thay doi khong thanh cong"
                        })
                });
                data.save((err) => {
                        if (err) return res.status(200).json({
                                success: false,
                                err: "thay doi khong thanh cong"
                        })
                        res.status(200).json({
                                success: true
                        })
                })
        })
}

module.exports.loadBill = function (req, res, next) {

        //load data
        bill.find((err, data) => {
                if (err) throw err;
                res.render('admin-bill', {
                        data: data
                });
        })
}


module.exports.renderAdminImage = async function (req, res, next) {
        allLink = []
        fs.readdirSync(process.cwd() + "/public/img/post-image").forEach(fileName => {
                allLink.push(fileName)
        });
        res.render('admin-image', { data: allLink });

}
module.exports.uploadImage = function (req, res, next) {
        uploadPostImage(req, res, function (err) {
                bodyData = req.body;
                res.redirect('/admin/image')
        })
}

module.exports.loadAddTeams = function (req, res, next) {
        res.render('admin-add-teams', {
                err: ''
        })
}

module.exports.postTeams = function (req, res, next) {
        uploadPostImage(req, res, function (err) {
                if (err) throw err;
                if (req.file === undefined) {
                        return res.render('admin-add-teams', {
                                err: 'Không có hình ảnh'
                        })
                }
                data = req.body;
                imagePath = "/img/post-image/" + req.file.filename;
                teams.create({
                        Name: data.title,
                        shortDescription: data.shortDescription,
                        image: imagePath,
                        contacts: data.contacts,
                        description: data.description
                }, (err, event) => {
                        if (err) {
                                return res.render('admin-add-teams', {
                                        err: 'Không thành công, xin thử lại'
                                })
                        }
                        res.redirect("/admin");
                })
        });
}
module.exports.loadTeams = function (req, res, next) {
        //var outData = {}

        //load data
        teams.find((err, data) => {
                if (err) res.send(err);
                res.render('admin-teams', { teams: data });
                //res.send(data[1]);
        })
        // teams.find((err, data) => {
        //         if (err) return res.render('admin-teams', {
        //                 err: 'Không thể kết nối database'
        //         })
        //         else
        //                 outData = {
        //                         teams: data
        //                 }
        //         res.render('admin-teams', {
        //                 data: outData
        //         })
        // })

}


module.exports.deleteTeams = function (req, res, next) {
        id = req.body.id;
        teams.deleteOne({
                _id: id
        }, (err) => {
                if (err) {
                        return res.status(404).json({
                                success: false
                        })
                } else
                        return res.status(200).json({
                                success: true
                        })
        })
}
module.exports.editTeams = function (req, res, next) {
        var id = req.params.id;
        teams.findOne({
                _id: id
        }, (err, teams) => {
                res.render('admin-edit-teams', {
                        data: teams
                })
        })
}

module.exports.updateTeams = function (req, res, next) {
        uploadPostImage(req, res, function (err) {
                bodyData = req.body;
                id = req.params.id;
                teams.findOne({
                        _id: id
                }, (err, teams) => {
                        teams.update({
                                Name: (teams.Name !== bodyData.Name) ? bodyData.Name : teams.Name,
                                shortDescription: (teams.shortDescription !== bodyData.shortDescription) ? bodyData.shortDescription : teams.shortDescription,
                                image: (req.file === undefined) ? teams.image : "/img/post-image/" + req.file.filename,
                                contacts: (teams.contacts !== bodyData.contacts) ? bodyData.contacts : teams.contacts,
                                description: (teams.description !== bodyData.description) ? bodyData.description : teams.description,
                        }, (err) => {
                                if (err) {
                                        if (err) return res.render('admin-edit-teams', {
                                                err: 'Không thành công, xin thử lại'
                                        })
                                }
                                res.redirect('/admin/teams');
                        })
                })
        })
}