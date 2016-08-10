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
    // .then(function() {
    //     return models.course.create({
    //         name: 'CBA Overview',
    //         description: 'This is CBA Overview description',
    //         category: 'Technical',
    //         test: 'This is CBA Overview test',
    //         documents: 'This is CBA Overview document',
    //         trainerID: 'Khai Doan'
    //     });
    // })
    // .then(function() {
    //     return models.course.create({
    //         name: 'CoreMW Overview',
    //         description: 'This is CoreMW Overview description',
    //         category: 'Technical',
    //         test: 'This is CoreMW Overview test',
    //         documents: 'This is CoreMW Overview document',
    //         trainerID: 'Tai Dinh'
    //     });
    // })
    // .then(function() {
    //     return models.course.create({
    //         name: 'LDE',
    //         description: 'This is LDE description',
    //         category: 'Technical',
    //         test: 'This is LDE test',
    //         documents: 'This is LDE document',
    //         trainerID: 'King Nguyen'
    //     });
    // })
    // .then(function() {
    //     return models.course.create({
    //         name: 'GIT & GERRIT',
    //         description: 'This is GIT & GERRIT description',
    //         category: 'Technical',
    //         test: 'This is GIT & GERRIT test',
    //         documents: 'This is GIT & GERRIT document',
    //         trainerID: 'Bao Nguyen'
    //     });
    // });
router.post('/getCourse', function(req, res) {
    log.info('/route/course: Get Course Information');
    models.course.findOne({
        where: {
            id: parseInt(req.body.courseID)
        }
    }).then(function(course) {
        res.send({
            courseName: course.name,
            courseTrainer: course.trainerID,
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
        return models.course.create({
            name: req.body.courseName,
            description: req.body.courseDescription,
            category: req.body.courseCategory,
            test: req.body.courseTest,
            documents: req.body.courseDocuments,
            trainerID: req.body.courseTrainerID
        }).then(function(data) {
            if (data.dataValues) {
                res.send({
                    msg: 'Add course success!'
                });
            } else {
                res.send({
                    msg: 'Add course fail!'
                });
            }
        })
    });
})

router.get('/deleteCourse', function() {
    log.info('/route/course: Delete course');;
})
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

// findAll
router.get('/list', function(req, res) {
    log.info('/route/course: get course list data');
    models.course.findAll().then(function(course) {
        var data = JSON.stringify(course);
        data = JSON.parse(data);
        var datasend = {
            course: data
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
