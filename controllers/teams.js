const teams = require('../models/teams');

module.exports.Load = function(req,res,next){
    var perPage = 5
    var page = req.query.page || 1;
    allTeams = teams.find((err,data)=>{
        if(err) return next(err);
        res.render('teams',{teams:data})
    })
}