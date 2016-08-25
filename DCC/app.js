var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('passport');
var models = require("./models");
var serveIndex = require('serve-index');
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();


var routes = require('./routes/index');
var users = require('./routes/users');
var course = require('./routes/course');
var feedback = require('./routes/feedback');

// Init App
var app = express();
// set view engine
app.use(expressLayouts);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/log', serveIndex('./public/log'));
app.use('/angular', express.static(path.join(__dirname, 'angular')));

// Express Session
// session will save user's credentials in 10 days
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 10 * 24 * 3600 * 1000
    },
    saveUninitialized: true,
    resave: true
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/course', course);
app.use('/feedback', feedback);

//association for user vs class as trainee vs class
models.User.belongsToMany(models.class, {as: 'Trainee', through: models.class_record, foreignKey:'trainee'});
models.class.belongsToMany(models.User, {as: 'StudyingClass', through: models.class_record, foreignKey:'class'});

//association for feedback
models.User.belongsToMany(models.course, {through: models.Feedback});
models.course.belongsToMany(models.User, {through: models.Feedback});
//association for user vs course as trainer vs class

models.course.belongsToMany(models.User,{as:'Trainer', through: 'trainer_course', foreignKey: 'course', otherKey:'trainer'});
// models.User.belongsToMany(models.course,{as:'C', through: 'trainer_class', foreignKey: 'trainer'});

// models.class.belongsToMany(models.User,{through: 'trainer_class', foreignKey: 'class'});
// models.User.belongsToMany(models.class,{as:'TeachingClass', through: 'trainer_class', foreignKey: 'trainer'});

models.class.belongsToMany(models.course,{through: 'course_class'});
models.course.belongsToMany(models.class,{through: 'course_class'});


models.class_record.sync({
    force: false
});
models.Feedback.sync({
  force: false
});
models.sequelize.sync({
  force:false
});
//
//
// var nguyen = models.User.build({
//   id:2
// })
//
// models.class.findOne({
//   where:{
//     id: 2,
//   }
// }).then(function(classInstance){
//   classInstance.addTrainer(nguyen);
// })
// //
// models.class.findOne({
//   where:{
//     id:1
//   }
// }).then(function(aClass){
//   aClass.getTrainer().then(function(res){
//     console.log(res[1].username);
//   });
//   // console.log(aClass);
// });

// Set Port
app.set('port', (process.env.PORT || 3210));
log.info('Server started on port ' + app.get('port'));
var server = app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
module.exports = server;
//exports.log = log;
