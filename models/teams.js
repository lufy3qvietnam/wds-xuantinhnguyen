var mongoose = require('mongoose');
const db = require('./connectDb');
const moment = require('moment')
moment.locale('vi')
const Schema = mongoose.Schema; 
const id = Schema.ObjectId;
const TeamsSchema = new Schema({
    id: id,
    Name: {
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
    members: [{
        name: String,
        comeFrom: String
    }],

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

const teams = db.model('teams',TeamsSchema); 


// teams.create({
//     Name : "vu",
//     shortDescription:"helllllllllllllll"
// })
module.exports = teams;