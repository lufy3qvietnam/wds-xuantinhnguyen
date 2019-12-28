const products = require('../models/products');
module.exports.addToMarket = async function (req, res, next) {
  var id = req.body.id;
  var data = await products.findOne({
    _id: id
  });
  if (req.session.cart) {
    //neu session ton tai
    req.session.cart.push(id)
  } else {
    req.session.cart = [id]
  }
  number = 0;
  req.session.cart.forEach(item => {
    if (item === id) {
      number++;
    }
  })
  res.status(200).json({
    success: true,
    name: data.name,
    price: data.price,
    number: number,
    id: id
  })
}
module.exports.removeFromCart = async function (req, res, next) {
  var cart = req.session.cart;
  var id = req.body.id;
  for(i=0; i<cart.length;i++){
    if(cart[i]==id){
      cart = cart.slice(i-1,i+1);
    }
  }
  req.session.cart = await cart;
  res.status(200).json({
    success: true,
    id:id
  })
}