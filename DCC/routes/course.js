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

models.course.sync({
  force:true
})
.then(function(){
  return models.course.create ({
    name: 'CBA Overview',
    description: 'This is CBA Overview description',
    category: 'Technical',
    test: 'This is CBA Overview test',
    documents: 'This is CBA Overview document',
    trainerID: 'Khai Doan'
  });
    })
  .then(function(){
    return models.course.create ({
      name: 'CoreMW Overview',
      description: 'This is CoreMW Overview description',
      category: 'Technical',
      test: 'This is CoreMW Overview test',
      documents: 'This is CoreMW Overview document',
      trainerID: 'Tai Dinh'
    });
      })
    .then(function(){
      return models.course.create ({
        name: 'LDE',
        description: 'This is LDE description',
        category: 'Technical',
        test: 'This is LDE test',
        documents: 'This is LDE document',
        trainerID: 'King Nguyen'
      });
        })
      .then(function(){
        return models.course.create ({
          name: 'GIT & GERRIT',
          description: 'This is GIT & GERRIT description',
          category: 'Technical',
          test: 'This is GIT & GERRIT test',
          documents: 'This is GIT & GERRIT document',
          trainerID: 'Bao Nguyen'
        });
});


router.get('/getCourse', function(req, res) {
    log.info('Get Course Information');
    models.course.findOne({
      where: {
        id: 1
      }
      }).then(function(course) {
        console.log(course);
        res.send({
            courseName: course.name,
            courseTrainer: course.trainerID,
            courseTrainerPage: '/users/trainerdashboard',
            courseDescription: course.description,
            courseDocuments: course.documents,
            courseCategory: course.category
        });
      });


});

router.get('/deleteCourse', function(req,res){
  log.info('Get Delete Command');
  //Course.deleteCourse('abc');
})
router.get('/features', function(req, res) {
  log.info('Get Features Information');
  models.course.findOne({
    where: {
      id: 1
    }
    }).then(function(course) {
      console.log(course);
      res.send({
          courseDocs: course.documents,
          courseTest: course.test,
          courseFeedback: 'This is my Feedback',
          courseRating: 5
      });
    });
});

// findAll
router.get('/list', function(req, res) {
  log.info('Get List of Courses');
  models.course.findAll().then(function(course) {
      console.log(course);
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
