var mongoose = require('mongoose');
const db = require('./connectDb');
const moment = require('moment')
moment.locale('vi')
const Schema = mongoose.Schema; 
const id = Schema.ObjectId;
const billSchema = new Schema({
    id: id,
    name: {
        type: String,
        required: false,
        maxlength: 200
    },
    contact: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    note: {
        type: String,
        required: false
    },
    cart:{type:Array,
        required:false},
    timeAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    sum: String,
    done: Boolean,
})
const bills = db.model('bills',billSchema); //model ten la events
// bills.deleteMany((err,data)=>{
//    console.log('done')
// })
// bills.findOne({_id:"5de73488f4d752219de1017f"},(err,data)=>{
//     data.update({done:true},(err)=>{
//         console.log('update xong')
//     });
//     data.save((err)=>{
//         console.log('done')
//     })
// })
// bills.findOneAndDelete({_id:"5de73488f4d752219de1017f"},(err)=>{
//     if(err) console.log(loi)
//     else console.log('xoa thanh cong')
// })
// bills.find((err,data)=>{
//    console.log(data)
// })
module.exports = bills;