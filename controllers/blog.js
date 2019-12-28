const events = require('../models/events');

module.exports.Load = function(req,res,next){
    var perPage = 5;
    var page = req.query.page || 1;
    events
        .find({})
        .skip((perPage * page) - perPage)
        .sort({ _id: -1 })
        .limit(perPage).exec(function(err,events_data){
            events.countDocuments().exec(function(err,count){
                if (err) return next(err)
                return res.render('blog',{
                    events: events_data, 
                    current: page, 
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}