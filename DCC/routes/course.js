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
    var tID = JSON.stringify(req.body.courseTrainerID);
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
                models.course.create({
                    name: req.body.courseName,
                    description: req.body.courseDescription,
                    category: req.body.courseCategory,
                    test: req.body.courseTest,
                    documents: req.body.courseDocuments,
                    trainerID: tID
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
    console.log('---------------------Done-------------------------');
console.log(req.body.courseIDEdit);
    var tID = JSON.stringify(req.body.courseTrainerIDEdit);
    models.course.sync({
        force: false
    }).then(function() {
        models.course.getCourseByID(req.body.courseIDEdit, function(result) {
console.log('---------------------Done-------------------------');
            if (result) {
                console.log('okay');
                models.course.update({
                    name: req.body.courseNameEdit,
                    description: req.body.courseDescriptionEdit,
                    category: req.body.courseCategoryEdit,
                    test: req.body.courseTestEdit,
                    documents: req.body.courseDocumentsEdit,
                    trainerID: tID
                }, {
                    where: {
                        id: tID
                    }
                }).then(function() {

                    res.send({
                        msg: 'Edit course success!'
                    });
                });
            } else {
              console.log('----------------------FAIL------------------------');
              console.log(req.body.courseNameEdit);
                res.send({
                    msg: 'Course not found in database'
                });
            }
        });
    });
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

router.get('/list', function(req, res) {
    log.info('/route/course: get course list data');
    models.course.getCourseList(function(course) {
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
