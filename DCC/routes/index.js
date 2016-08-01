var express = require('express');
var router = express.Router();
var delog = require('../delog');
var opts = {
    logDirectory:'./public/log',
    fileNamePattern:'roll-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();
// get homepage
router.get('/',function(req, res){
    res.status(200).render('index');
  });


function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
}
module.exports = router;
