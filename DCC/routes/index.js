var express = require('express');
var router = express.Router();

// get homepage
router.get('/',function(req, res){
    res.render('index');
  });

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
}
module.exports = router;
