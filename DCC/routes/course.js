var express = require('express');
var router = express.Router();
var Course = require('../models/course');

// force: true will drop the table if it already exists

// Or you can simply use a connection uri
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};


var log = require('simple-node-logger').createLogManager(opts).createLogger();

// Course.createCourseT({
//     cName: 'Agile',
//     cTrainer: 'Nguyen Dang QUang'
// });
// Course.createCourseT({
//     cName: 'ICT',
//     cTrainer: 'Nguyen Truc'
// });
router.get('/getCourse', function(req, res) {
    log.info('Get Course Information');
    // Course.getCourseByCoursename('ICT', function(user) {
    //     log.info(user);
    // });
    res.send({
        cName: 'ssss',
        cTrainer: 'ssss',
        cTrainerPage: '/users/trainerdashboard',
        cDescription: "Lorem ipsum dolor sit ametfgdfgdfgdfgdfgdfg"
    });
});

router.get('/deleteCourse', function(req,res){
  log.info('Get Delete Command');
  //Course.deleteCourse('abc');
})
router.get('/features', function(req, res) {
    log.info('Get Features Information')
    res.send({
        cDocs: 'https://www.dektech.com.au/',
        cTest: 'https://www.dektech.com.au/',
        cFeedback: 'https://www.dektech.com.au/"',
        cRating: 'https://www.dektech.com.au/'
    });
});
router.get('/', function(req, res) {
    res.render('courses');
    log.info('get courses ', res.statusCode);
});
router.get('/coursesoverview', function(req, res) {
    res.render('coursesoverview');
    log.info('get coursesoverview ', res.statusCode);
});
router.get('/trainerdashboard', function(req, res) {
    res.render('trainerdashboard');
});
module.exports = router;
