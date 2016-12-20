var express = require('express');
var router = express.Router();
var gcal = require('../../config/google_api/gcal.js');
var log = require('../../config/logConfig');

// get homepage
router.get('/', function(req, res) {
    res.render('./index');
});
router.get('/getEvents', function(req, res) {
    var events = null;
    gcal.getEvents(function( eventList)
    {
        events = eventList;
    });
    res.send(events)
});

router.get('/isLogged', ensureAuthenticated, function() {
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.send(req.session.passport.user);
        return next();
    } else {
        res.send(null);
        return next();
    }
}
module.exports = router;
