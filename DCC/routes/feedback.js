var models = require("../models");
var express = require('express');
var router = express.Router();


var opts = {
  logDirectory: './public/log',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
};
var curUserID = 2;

var log = require('simple-node-logger').createLogManager(opts).createLogger();

models.Feedback.sync({
  force: false
});

router.post('/comment', function(req, res) {
  log.info('/route/feedback : comment for course that its id is ' + req.body.courseID);
  models.Feedback.findOne({
    where: {
      userID: curUserID,
      courseID: req.body.courseID
    }
  }).then(function(feedback) {
    if (feedback === null) {
      models.Feedback.create({
        userID: curUserID,
        comment: req.body.comment,
        courseID: req.body.courseID,
      }).then(function() {
        res.send({
          msg: 'create successfully'
        });
      });
    } else {
      models.Feedback.update({
        comment: req.body.comment,
        courseID: req.body.courseID,
      }, {
        where: {
          userID: curUserID,
          courseID: req.body.courseID,
        }
      }).then(function() {
        res.send({
          msg: 'update successfully'
        });
      });
    }
  })
});

router.post('/rating', function(req, res) {
  log.info('/route/feedback : rating for course that its id is ' + req.body.courseID);
  models.Feedback.findOne({
    where: {
      userID: curUserID,
      courseID: req.body.courseID
    }
  }).then(function(feedback) {
    if (feedback === null) {
      models.Feedback.create({
        userID: curUserID,
        rating: req.body.rating,
        courseID: req.body.courseID,
      }).then(function() {
        res.send({
          msg: 'create successfully'
        });
      });
    } else {
      models.Feedback.update({
        rating: req.body.rating,
        courseID: req.body.courseID,
      }, {
        where: {
          userID: curUserID,
          courseID: req.body.courseID,
        }
      }).then(function() {
        res.send({
          msg: 'update successfully'
        });
      });
    }
  })
});

router.post('/showFeedback', function(req, res) {
  log.info('/route/feedback : show feedback for course that its id is ' + req.body.courseID);
  models.Feedback.findAll({
    where: {
      courseID: req.body.courseID
    }
  }).then(function(feedback) {
    res.send(feedback);
  })
});

module.exports = router;
