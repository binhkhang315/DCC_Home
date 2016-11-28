var models = require("../models");
var express = require('express');
var router = express.Router();


var opts = {
  logDirectory: './public/log',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
};

var log = require('simple-node-logger').createLogManager(opts).createLogger();

// models.Feedback.sync({
//   force: false
// });


router.post('/comment', function(req, res) {
  var query = {
    where: {username: req.user.mail}
  };

  log.info('/route/feedback : comment for course that its id is ' + req.body.courseId);
  models.User.findOne(query).then(function(user) {
    var queryFeedback = {
      where: {
        UserId: user.id,
        courseId: req.body.courseId
      }
    };
    models.Feedback.findOne(queryFeedback).then(function(feedback) {
      if (feedback === null) {
        models.Feedback.create({
          UserId: user.id,
          comment: req.body.comment,
          courseId: req.body.courseId,
        }).then(function() {
          res.send({
            msg: 'create successfully'
          });
        });
      } else {
        models.Feedback.update({
          comment: req.body.comment,
          courseId: req.body.courseId,
        }, {
          where: {
            UserId: user.id,
            courseId: req.body.courseId,
          }
        }).then(function() {
          res.send({
            msg: 'update successfully'
          });
        });
      }
    })
  })
});

router.post('/rating', function(req, res) {
  log.info('/route/feedback : rating for course that its id is ' + req.body.courseId);
  models.User.findOne({
    where: {username: req.user.mail}
  }).then(function(user) {
    models.Feedback.findOne({
      where: {
        UserId: user.id,
        courseId: req.body.courseId
      }
    }).then(function(feedback) {
      if (feedback === null) {
        models.Feedback.create({
          UserId: user.id,
          rating: req.body.rating,
          courseId: req.body.courseId,
        }).then(function() {
          res.send({
            msg: 'create successfully'
          });
        });
      } else {
        models.Feedback.update({
          rating: req.body.rating,
          courseId: req.body.courseId,
        }, {
          where: {
            UserId: user.id,
            courseId: req.body.courseId,
          }
        }).then(function() {
          res.send({
            msg: 'update successfully'
          });
        });
      }
    })
  });
});

router.post('/showFeedback', function(req, res) {
  log.info('/route/feedback : show feedback for course that its id is ' + req.body.courseId);
  models.Feedback.findAll({
    where: {
      courseId: req.body.courseId
    }
  }).then(function(feedback) {
    res.send(feedback);
  })
});

router.post('/showAverageRating',function(req,res){
  log.info('/route feedback : show average rating for a course');
  models.Feedback.findAll({
    where:{
      courseId : req.body.courseId
    }
  }).then(function(feedback){
    var sumRating = 0;
    for( var i = 0; i < feedback.length; i++){
      sumRating = sumRating + feedback[i].dataValues.rating;
    }
    var avg = sumRating/feedback.length;
    res.send({result:avg.toString()});
  })
})

module.exports = router;
