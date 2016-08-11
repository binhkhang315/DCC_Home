var express = require('express');
var router = express.Router();
var models = require('../models');


// force: true will drop the table if it already exists

// Or you can simply use a connection uri
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};

var log = require('simple-node-logger').createLogManager(opts).createLogger();
// add course detail to database

models.course.sync({
        force: false
    });

router.post('/getCourse', function(req, res) {
    log.info('/route/course: Get Course Information');
    models.course.findOne({
        where: {
            id: parseInt(req.body.courseID)
        }
    }).then(function(course) {
        var tID = JSON.parse(course.trainerID);
        console.log('-------------------------');
        console.log(tID);
        res.send({
            courseName: course.name,
            courseTrainer: tID,
            courseTrainerPage: '/course/trainerdashboard',
            courseDescription: course.description,
            courseDocuments: course.documents,
            courseCategory: course.category
        });
    });
});

// add course to database
router.post('/addCourse', function(req, res) {
    log.info('/route/course: Add course :' + req.body);
    models.course.sync({
        force: false
    }).then(function() {
        // this function check if the courseName is already existed
        models.course.getCourseByName(req.body.courseName, function(result) {
            if (result) {
                res.send({
                    msg: 'Name already existed. Add fail!'
                });
            } else {
                return models.course.create({
                    name: req.body.courseName,
                    description: req.body.courseDescription,
                    category: req.body.courseCategory,
                    test: req.body.courseTest,
                    documents: req.body.courseDocuments,
                    trainerID: req.body.courseTrainerID
                }).then(function(data) {
                    res.send({
                        msg: 'Add course success!'
                    });
                })
            }
        });
    });
})

// update course in database
router.post('/updateCourse', function(req, res) {
    log.info('Get Course Information');
    console.log('----------------------------------------------');
    console.log(req.body.courseNameEdit);
    var tID = JSON.stringify(req.body.courseTrainerIDEdit);
    models.course.update({
            name: req.body.courseNameEdit,
            description: req.body.courseDescriptionEdit,
            category: req.body.courseCategoryEdit,
            test: req.body.courseTestEdit,
            documents: req.body.courseDocumentsEdit,
            trainerID: tID
        }, {
            where: {
                id: req.body.courseIDEdit
            }
        })
});

// mark course as deleted (isDeleted = true)
router.post('/isDeletedCourse', function(req, res) {
    log.info('Get Delete Command');
    models.course.update({
            isDeleted: true
        }, {
            where: {
                id: req.body.courseIDDelete
            }
        })
});

// router.get('/features', function(req, res) {
//     log.info('/route/course: get feature data');
//     models.course.findOne({
//         where: {
//             id: cid
//         }
//     }).then(function(course) {
//         res.send({
//             courseDocs: course.documents,
//             courseTest: course.test,
//             courseFeedback: 'This is my Feedback',
//             courseRating: 5
//         });
//     });
// });

// findAll(): get the list of all courses in database
router.get('/list', function(req, res) {
    log.info('/route/course: get course list data');
    models.course.getCourseList(function(course){
        // var data = JSON.stringify(course);
        // data = JSON.parse(data);
        var datasend = {
            course: course
        }
        res.send(datasend);
    });
});

router.get('/', function(req, res) {
    res.render('courses');
    log.info('/route/course: GET /course');
});
router.get('/coursesoverview/', function(req, res) {
    res.render('coursesoverview');
    log.info('/route/course: GET /course/coursesoverview');
});

router.get('/coursesoverview/:id', function(req, res) {
    res.render('coursesoverview');
    log.info('/route/course: GET /course/coursesoverview/:id');
});
router.get('/trainerdashboard', function(req, res) {
    log.info('/route/course: GET /course/trainerdashboard');
    res.render('trainerdashboard');
});
module.exports = router;
