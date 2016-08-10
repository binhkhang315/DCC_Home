var models = require("../models");

exports.saveFeedback = function(req, res) {
    models.Feedback.findOne({where:{userID:1}}).then(function(feedback) {
      if(feedback===null){
      models.Feedback.create({
        userID: '1',
        comment: req.body.comment,
    }).then(function(feedbacks){
        res.json(feedbacks.dataValues);
    });
  }else{
    models.Feedback.update({
      comment: req.body.comment
    },{
      where:{
        userID: '1'
      }
    })
  }})
};
//
exports.saveRating = function(req, res) {
    models.Feedback.findOne({where:{userID:1}}).then(function(feedback){
    if(feedback === null){
    models.Feedback.create({
        userID: '1',
        rating: req.body.rating,
    }).then(function(feedbacks){
        res.json(feedbacks.dataValues);
    });
  }else{
    models.Feedback.update({
      rating: req.body.rating
    },{
      where:{
        userID: '1'
      }
    })
  }})
};

models.Feedback.sync({
  force:true
});
