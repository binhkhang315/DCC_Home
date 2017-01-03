var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('passport');
var models = require("./server/models");
var serveIndex = require('serve-index');

var log = require('./config/logConfig');

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
app.use(express.static(path.join(__dirname, '/client/assets')));
app.use('/log', serveIndex('/client/assets/log'));
app.use('/angular', express.static(path.join(__dirname, '/client/angular')));
app.set('views', path.join(__dirname, '/client/views'));
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

//register router
app.use('/', require('./server/routes/index'));
app.use('/users', require('./server/routes/users'));
app.use('/course', require('./server/routes/course'));
app.use('/feedback', require('./server/routes/feedback'));
//app.use('/session',require('./server/routes/session'));

//create database tables
models.sequelize.sync({force:false});

models.User.belongsToMany(models.course, {through: models.Feedback});
models.course.belongsToMany(models.User, {through: models.Feedback});
models.training_program.sync({
  force: false
});

// models.course.belongsToMany(models.User,{as:'Trainer', through: 'trainer_course', foreignKey: 'course', otherKey:'trainer'});
// models.class.belongsToMany(models.course,{through: 'course_class'});
// models.course.belongsToMany(models.class,{through: 'course_class'});


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


// Set Port
app.set('port', (process.env.PORT || 3210));
log.info('Server started on port ' + app.get('port'));
var server = app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
module.exports = server;
