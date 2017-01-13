var express = require('express');
var router = express.Router();
var models = require('../../models');
var log = require('../../../config/logConfig');

router.get('/getTrainingProgram', function(req, res){
    var query = { include: [ models.Course ]};
    models.TrainingProgram.findAll(query).then(function(trainingProgram) {
        var datasend = {
            msg:'send list success',
            data: trainingProgram
        };
        res.send(datasend);
    });
});

router.get('/getOpeningCourse', function(req, res){
    // var query = { include: [ models.Course ]};
    // models.TrainingProgram.findAll(query).then(
    //     function(trainingProgram) {
    //         var datasend = {
    //             msg:'send list success',
    //             data: trainingProgram
    //         };
    //         res.send(datasend);
    //     });
    // models.Class.getOpeningClass(
    //     function(openingClass) {
    //         models.Course.findAll({
    //             where:{id: openingClass.courseId}
    //         }).then(
    //             function(courses) {
    //                 var datasend = {
    //                     msg:'send list success',
    //                     data: courses
    //                 };
    //                 res.send(datasend);
    //             }
    //         );
    //
    //     });
    // });
    models.Class.getOpeningClass(
        function(openingClass)
        {
            var datasend = {
                msg:'send list success',
                data: openingClass
            };
            res.send(datasend);

        }
    );
});
module.exports = router;
