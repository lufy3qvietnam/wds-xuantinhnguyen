var mongoose = require('mongoose');
const db = require('./connectDb');
const moment = require('moment')
moment.locale('vi')
const Schema = mongoose.Schema; 
const id = Schema.ObjectId;
const eventSchema = new Schema({
    id: id,
    title: {
        type: String,
        required: false,
        maxlength: 200
    },
    shortDescription: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false
    },
    members: [{
        name: String,
        comeFrom: String
    }],
    timeOpen: {
        type: Date,
        required: false,
        default: Date.now
    },
    timeEnd: {
        type: Date,
        required: false
    },
    image: {
        type: String,
        required: false,
        default: 0
    },
    contacts: { 
        type: String,
        require: false
    }
})
eventSchema.methods.parseDate = function () {
    date = new Date(this.timeOpen).toDateString();
    return moment(this.timeOpen).format('L');
  };
const events = db.model('events',eventSchema); //model ten la events
// events.deleteMany((err,data)=>{
//    console.log('done')
// })
// events.findOne({_id:"5dd8e80c1393121b3b733386"},(err,data)=>{
//     data.update({title:"da chinh sua tieu de lan 2"},(err)=>{
//         console.log('update xong')
//     });
    // data.save((err)=>{
    //     console.log('done')
    // })
// })
// events.find((err,data)=>{
//     console.log(data)
// })
module.exports = events;