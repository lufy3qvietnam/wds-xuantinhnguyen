const events = require('../models/events');

module.exports.loadPost = function (req, res, next) {
    id = req.params.id;
    events.find((err0, events_data) => {
        if (err0) return res.send('loaded error' + err0);
        events.findOne({ _id: id }, (err1, event_data) => {
            if (err1) return res.send('loaded error' + err1);
            // Get date info
            var DateNow = new Date().toISOString();
            DateNow = Date.parse(DateNow);
            var date = Date.parse(event_data.timeOpen.toString());
            if (date <= DateNow) ValidStatus = "Đang diễn ra";
            else ValidStatus = "Chưa diễn ra";
            return res.render('details', { event: event_data, ValidStatus: ValidStatus, events: events_data});
        })
    }).sort({ _id: -1 }).limit(5)
}