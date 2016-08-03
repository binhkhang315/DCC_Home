var express = require('express');
var router = express.Router();

var opts = {
    logDirectory:'./public/log',
    fileNamePattern:'roll-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

router.get('/getCourse', function(req, res) {
  log.info('Get Course Information')
    res.send({
        cName: 'Agile Course',
        cTrainer: 'Nguyen Dang Quang',
        cTrainerPage: '/users/trainerdashboard',
        cDescription: "Lorem ipsum dolor sit ametfgdfgdfgdfgdfgdfg"
    });
  });
module.exports = router;
