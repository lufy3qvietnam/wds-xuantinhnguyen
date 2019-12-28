var bills = require('../models/bill');
var request = require('request')
module.exports.checkout = function (req, res, next) {
    cart = req.body.cart;
    user = req.body.user;
    secretKey = "6Lcv6MQUAAAAAIw9plRu0MOs0G47eEjlYdXjvwm7"
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + user.capchaResponse + "&remoteip=" + req.connection.remoteAddress;
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            console.log('loi capcha')
            return res.status(200).json({
                success: false,
                error: "Capcha không hợp lệ"
            })
        }
        bills.create({
            sum: cart.sum,
            name: user.name,
            contact: user.contact,
            address: user.address,
            note: user.note,
            cart: cart.items
        }, (err) => {
            if (err) return res.status(200).json({
                success: false,
                error: "Không thể thực hiện, thử lại sau !"
            })
            req.session.cart = "";
            return res.status(200).json({
                success: true,
            })
        })
    })
}