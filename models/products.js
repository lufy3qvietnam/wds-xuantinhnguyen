var mongoose = require('mongoose');
const db = require('./connectDb');
const Schema = mongoose.Schema; 
const id = Schema.ObjectId;
const type = require('./productType')
const productSchema = new Schema({
    id: id,
    name: String,
    price: Number,
    type: {type:id,ref:"productType"},
    image: String,
    available: Boolean,
    typename: String
})
const products = db.model('products',productSchema); //model ten la events
// type.findOne({name:"souverne"},(err,data)=>{
//     products.create({
//     name:"day deo co",
//     price:10000,
//     available:true,
//     type: data._id,
//     typename :data.name,
//     image: "/img/portfolio/4.jpg",
//     available: true,
// },(err,item)=>{
//     data.product.push(item._id);
//     data.save((err)=>{
//         if(err) console.log('that bai')
//     else console.log('thanh cong')
//     });
// })
// })
// products.deleteOne({_id: "5dd3a66540aa840c787c60a1"},(err)=>{
//     console.log('done')
// });
// products.update({_id:"5dd3a66540aa840c787c60a1"},{image:"/img/portfolio/4.jpg"});
// products.find((err,data)=>{
//     if(err) console.log(err);
//     console.log(data)
// })
// products.deleteMany({},(err)=>{
//     if(err) console.log('faile')
//     console.log('thanh cong')
// });
module.exports = products;