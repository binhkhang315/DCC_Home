var models = require("../models");
var express = require('express');
var router = express.Router();
var log = require('../../config/logConfig');

models.Feedback.sync({
    force: false
});
router.post('/comment', function(req, res) {
    var query = {
        where: {email: req.user.mail}
    };

    log.info('/route/feedback : comment for course that its id is ' + req.body.courseId);
    models.User.findOne(query).then(function(user) {
        var queryFeedback = {
            where: {
                userId: user.id,
                courseId: req.body.courseId
            }
        };
        models.Feedback.findOne(queryFeedback).then(function(feedback) {
            if (feedback === null) {
                models.Feedback.create({
                    userId: user.id,
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
                    where: queryFeedback
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
        where: {email: req.user.mail}
    }).then(function(user) {
        models.Feedback.findOne({
            where: {
                userId: user.id,
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
                    rating: req.body.rating
                }, {
                    where: {
                        userId: user.id,
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

router.post('/getAllFeedbacks', function(req, res) {
    log.info('/route/getAllFeedbacks : show all feedbacks for course that its id is ' + req.body.courseId);
    models.Feedback.findAll({
        where: {
            courseId: req.body.courseId
        }
    }).then(function(feedback) {
        res.send(feedback);
    })
});
router.post('/getFeedback', function(req, res) {
    log.info('/route/getAllFeedbacks : show all feedbacks for course that its id is ' + req.body.courseId);
    models.Feedback.findOne({
        where: {
            userId: req.body.userId,
            courseId: req.body.courseId
        }
    }).then(function(feedback) {
        res.send(feedback);
    })
});

router.post('/getAverageRating',function(req,res){
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
