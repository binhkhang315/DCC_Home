var models = require("../models");

exports.savefeedback = function(req, res) {
  console.log(req.body.comment);
    models.Feedback.create({
        comment: req.body.comment
        // rating: req.body.rating
    }).then(function(feedbacks){
        res.json(feedbacks.dataValues);
    }).catch(function(error){
        console.log("ops: " + error);
        res.status(500).json({ error: 'error' });
    });
};

models.Feedback.sync({
  force:true
})
.then(function(){
  return models.course.create ({
    comment: 'Fucking bad'
  });
});
