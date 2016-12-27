var _feedbackModel = require('./DataObjects/feedback');


module.exports = function(sequelize, DataTypes) {
    var Feedback = sequelize.define('Feedback', _feedbackModel,{
        classMethods: {
        getAllFeedback: function(cb) {
            log.info('/models/feedback: getAllFeedback() : ');
            Feedback.findAll().then(cb);
        },
        getFeedbackByClassID: function(id, cb) {
            log.info('/models/feedback: getFeedbackByClassID() : ' + id);
            var query = {
                where: {
                    classId: id
                }
            };
            Feedback.findOne(query).then(cb);
        },
        getFeedbackByRating: function(rating, cb)
        {
            log.info('/models/feedback: getFeedbackByRating() : ' + rating);
            var query = {
                where: {
                  rating: rating
                }
            };
            Feedback.findOne(query).then(cb);
        },
        getFeedbackByCommentedBy: function(commentedBy, cb) {
            log.info('/models/feedback: getFeedbackByCommentedBy() : ' + commentedBy);
            var query = {
                where: {
                    commentedBy: commentedBy
                }
            };
            Feedback.findOne(query).then(cb);
        }
      },

      tableName: 'feedback'
    });
    return Feedback;
};
