var express = require('express');
var router = express.Router();
var opts = {
    logDirectory:'./public/log',
    fileNamePattern:'roll-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();
// get homepage
router.get('/',function(req, res){
    res.render('index');
  });

  router.get('/isLogged', ensureAuthenticated, function(req, res) {
      //res.render('index');
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
