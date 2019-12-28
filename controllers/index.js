const events = require('../models/events');
const products = require('../models/products');
const moment = require('moment')
moment.locale('vi')
const productType = require('../models/productType')
function getType() {
    return new Promise((resolve, reject) => {
        productType.find((err, data) => {
            if (err) reject("")
            else resolve(data)
        })
    })
}
module.exports.loadIndex = function (req, res, next) {
    //check session roi load gio hang neu co
    //load data tu database ra
    products.find((err1, pData) => {
        events.find(async (err2, eData) => {
            
            for (event of eData) {
                date = new Date(event.timeOpen).toDateString();
                event.openString = moment(event.timeOpen).format('L');
                event.closeString = moment(event.timeClose).format('L');
            }
            var dataOut = {
                products: pData,
                events: eData,
                types: []
            }
            var types = await getType();
            for (type of types) {
                if (type.product.length > 0) {
                    dataOut.types.push(type.name)
                }
            }
            if (err1 || err2) {
                console.log('khong ket noi duoc db');
                return res.render('index', {
                    data: "",
                    err: "Khong ket noi duoc co so du lieu"
                })
            }
            if (dataOut.length === 0) {
                console.log('khong co data');
                return res.render('index', {
                    data: "",
                    err: "Khong co data"
                })
            } else {
                console.log('load thanh cong');
                if (req.session.cart) {
                    cart = {};
                    for (item of req.session.cart) {
                        count = 0;
                        for (check of req.session.cart) {
                            if (check === item) {
                                count++;
                            }
                        }
                        cart[item] = count;
                    }
                    dataOut.cart = pData.map(product => {
                        if (cart[product._id]) {
                            return ({
                                id: product._id,
                                name: product.name,
                                number: cart[product._id],
                                price : product.price
                            })
                        } else {
                            return;
                        }
                    })
                }
                return res.render('index', {
                    data: dataOut
                }) //can them chuc nang load session
            }
        })
    })
    //parse roi hien thi ngoai index
}