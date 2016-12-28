var express = require('express');
var router = express.Router();
var models = require('../models');
var log = require('../../config/logConfig');

// force: true will drop the table if it already exists
// Or you can simply use a connection uri
// add course detail to database
models.Course.sync({
    force: false
});

router.post('/getCourse', function(req, res) {
    log.info('/route/course: Get Course Information');
    models.Course.getByID(parseInt(req.body.courseID), function(course) {
        //TODO respond with belong2TrainingProgram as training program name, not ID
        if (course != null){
            res.send({
                data: course,
                msg: "success",
            });
        } else {
            res.send({
                msg: "fail",
            });
        }
    });
});

// add course to database
router.post('/addCourse', function(req, res) {
    log.info('/routes/course: Add course :' + req.body.courseName);
    models.Course.sync({
        force: false
    }).then(function() {
        // this function check if the courseName is already existed
        models.Course.getByName(req.body.courseName, function(result) {
            if (result) {
                res.send({
                    msg: 'Name already existed. Add fail!'
                });
            } else {
                models.Course.create({
                    name: req.body.courseName,
                    description: req.body.courseDescription,
                    duration: req.body.courseDuration,
                    test: req.body.courseTest,
                    documents: req.body.courseDocuments,
                    isDeleted:  0,
                    sessionId: req.body.sessionId,
                    img: '/img/course/default.png',
                }).then(function() {
                    res.send({
                        msg: 'Add course success!'
                    });
                });
            }
        });
    });
});

// update course in database
router.post('/updateCourse', function(req, res) {
    log.info('Get Course Information');
    models.Course.sync({
        force: false
    }).then(function() {
        models.Course.update({
            name: req.body.courseName,
            description: req.body.courseDescription,
            duration: req.body.courseDuration,
            test: req.body.courseTest,
            documents: req.body.courseDocuments,
            isDeleted:  req.body.isDeleted,
            sessionId: req.body.sessionId,
            img: req.body.img,
        }, {
            where: {
                id: req.body.courseId
            }
        }).then(function() {
            res.send({
                msg: 'Edit course success!'
            });
        });
    });
});

// mark course as deleted (isDeleted = true)
router.post('/deleteCourse', function(req, res) {
    log.info('Get Delete Command');
    models.Course.getByID(req.body.courseId, function(result) {
        if (result) {
            models.Course.update({
                isDeleted: true
            }, {
                where: {
                    id: req.body.courseId
                }
            });
            res.send({
                msg: 'Delete success'
            });
        } else {
            res.send({
                msg: 'Delete failure'
            });
        }
    });
});

router.get('/list', function(req, res) {
    log.info('/routes/course: get course list data');
    models.Course.getCourses(function(courses) {
        var datasend = {
            courses: courses,
            msg:'send list success'
        };
        res.send(datasend);
    });
});

router.get('/', function(req, res) {
    res.render('courses');
    log.info('/route/course: GET /course');
});
router.get('/coursedetail/', function(req, res) {
    res.render('coursedetail');
    log.info('/route/course: GET /course/coursedetail');
});

router.get('/coursedetail/:id', function(req, res) {
    res.render('coursedetail');
    log.info('/route/course: GET /course/coursedetail/:id');
});
router.get('/trainerdashboard', function(req, res) {
    log.info('/route/course: GET /course/trainerdashboard');
    res.render('trainerdashboard');
});

module.exports = router;
