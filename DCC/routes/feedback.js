var models = require("../models");
var express = require('express');
var router = express.Router();


var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var curUserID = 1;

var log = require('simple-node-logger').createLogManager(opts).createLogger();

models.Feedback.sync({
  force:false
});

router.post('/comment',function(req,res){
  log.info('/route/feedback : comment for course');
  models.Feedback.findOne({
      where:{
        userID : curUserID,
        courseID : req.body.courseID
    }
  }).then(function(feedback) {
      if(feedback===null){
      models.Feedback.create({
        userID: curUserID,
        comment: req.body.comment,
        courseID:req.body.courseID,
      });
      }
      else{
    models.Feedback.update({
      comment: req.body.comment,
      courseID:req.body.courseID,
    },{
      where:{
        userID: curUserID,
        courseID: req.body.courseID,
      }
    })
  }})
});

router.post('/rating',function(req,res){
  log.info('/route/feedback : rating for course');
  models.Feedback.findOne({
      where:{
        userID:curUserID,
        courseID:req.body.courseID
      }
    }).then(function(feedback){
    if(feedback === null){
    models.Feedback.create({
        userID: curUserID,
        rating: req.body.rating,
        courseID:req.body.courseID,
    });
  }else{
    models.Feedback.update({
      rating: req.body.rating,
      courseID:req.body.courseID,
    },{
      where:{
        userID: curUserID,
        courseID: req.body.courseID,
      }
    })
  }})
});

router.post('/showFeedback',function(req,res){
  log.info('/route/feedback : show feedback for course');
  models.Feedback.findAll({
    where:{
      courseID : req.body.courseID
    }
  }).then(function(feedback){
    res.send(feedback);
  })
});

module.exports = router;
