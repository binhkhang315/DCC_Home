var models = require("../models");

exports.savefeedback = function(req, res) {
    models.Feedback.create({
        comment: req.body.comment
            // rating: req.body.rating
    }).then(function(feedbacks) {
        res.json(feedbacks.dataValues);
    }).catch(function(error) {
        res.status(500).json({
            error: 'error'
        });
    });
};

models.Feedback.sync({
        force: false
    })
    .then(function() {
        return models.Feedback.create({
            comment: 'this is feed'
        });
    });
