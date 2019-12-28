var mongoose = require('mongoose');
const db = require('./connectDb');
const Schema = mongoose.Schema; 
const id = Schema.ObjectId;
const typeSchema = new Schema({
    id: id,
    name: String,
    product : [{type: id,ref:"products"}]
})
const productType = db.model('productType',typeSchema);
// productType.create({
//     name:"souverne",
// },(err)=>{
//     if(err) console.log('that bai')
//     else console.log('thanh cong type')
// })
// productType.deleteMany({},(err)=>{
//     if(err) console.log('faile')
//     console.log('thanh cong')
// });
// productType.find((err,data)=>{
//     console.log(data)
// })
module.exports = productType;