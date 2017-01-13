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
    log.info('/routes/course: Add course :' + req.body.name);
    models.Course.sync({
        force: false
    }).then(function() {
        // this function check if the courseName is already existed
        models.Course.getByName(req.body.name, function(result) {
            if (result) {
                res.send({
                    msg: 'Name already existed. Add fail!'
                });
            } else {
                models.Course.create({
                    name: req.body.name,
                    description: req.body.description,
                    duration: req.body.duration,
                    test: req.body.test,
                    documents: req.body.documents,
                    isDeleted:  0,
                    sessionId: req.body.session,
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
            name: req.body.nameEdit,
            description: req.body.descriptionEdit,
            duration: req.body.durationEdit,
            test: req.body.testEdit,
            documents: req.body.documentsEdit,
            isDeleted:  0,
            sessionId: req.body.sessionEdit,
            img:  '/img/course/default.png',
        }, {
            where: {
                id: req.body.idEdit
            }
        }).then(function() {
            res.send({
                msg: 'Edit course success!'
            });
        });
    });
});

// mark course as deleted (isDeleted = true)
router.post('/isDeletedCourse', function(req, res) {
    log.info('Get Delete Command');
    models.Course.getByID(req.body.courseIDDelete, function(result) {
        if (result) {
            models.Course.update({
                isDeleted: true
            }, {
                where: {
                    id: req.body.courseIDDelete
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
    // models.Course.getCourses(function(courses) {
    //     var datasend = {
    //         courses: courses,
    //         msg:'send list success'
    //     };
    //     res.send(datasend);
    // });
    models.Course.findAll({
        where:{isDeleted: false},
        include: [ models.Session ]
    }).then(function(courses) {
        var datasend = {
            course: courses,
            msg:'send list success'
        };
        res.send(datasend);
    })

});

router.get('/list/byCategory', function(req, res) {
    log.info('/routes/course: get course list data');
    models.course.getByCategory(function(courseListByCategory) {
        var datasend = {
            courseListByCategory: courseListByCategory,
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
