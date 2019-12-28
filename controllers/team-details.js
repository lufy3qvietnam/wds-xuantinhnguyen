const teams = require('../models/teams');
 
module.exports.loadPost = function(req,res,next){
    id = req.params.id;
    teams.find((err1,teams_data) => {
        if(err1) return res.send('loaded error' + err1);
        teams.findOne({_id:id},(err2,data)=>{
            if(err2) return res.send('loaded error' + err2);
            return res.render('team-details', {team : data, teams : teams_data});
        })
    }).sort({ _id: -1 }).limit(5)
}