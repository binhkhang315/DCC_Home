var models = require("../models");
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};

var log = require('simple-node-logger').createLogManager(opts).createLogger();

models.Feedback.sync({
  force:false
});

exports.saveFeedback = function(req, res) {
    models.Feedback.findOne({
      where:{
        userID:1,
        courseID:req.body.courseID
    }
  }).then(function(feedback) {
      if(feedback===null){
      models.Feedback.create({
        userID: '1',
        comment: req.body.comment,
        courseID:req.body.courseID,
    });
  }else{
    models.Feedback.update({
      comment: req.body.comment,
      courseID:req.body.courseID,
    },{
      where:{
        userID: '1',
        courseID: req.body.courseID,
      }
    })
  }})
};
//
exports.saveRating = function(req, res) {
    models.Feedback.findOne({
      where:{
        userID:1,
        courseID:req.body.courseID
      }
    }).then(function(feedback){
    if(feedback === null){
    models.Feedback.create({
        userID: '1',
        rating: req.body.rating,
        courseID:req.body.courseID,
    });
  }else{
    models.Feedback.update({
      rating: req.body.rating,
      courseID:req.body.courseID,
    },{
      where:{
        userID: '1',
        courseID: req.body.courseID,
      }
    })
  }})
};

exports.showFeedback = function(req, res) {
  console.log('showFeedback');
  models.Feedback.findAll({
    where:{
      courseID : req.body.courseID
    }
  }).then(function(feedback){
    res.send(feedback);
  })
};
