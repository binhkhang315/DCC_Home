var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var serveIndex = require('serve-index');

var opts = {
    logDirectory:'./public/log',
    fileNamePattern:'roll-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

mongoose.connect('mongodb://localhost/DCC');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var course = require('./routes/course');
// Init App
var app = express(), handlebars;

// View Engine
handlebars = exphbs.create({
    defaultLayout: 'layout',
    extname      : '.html', //set extension to .html so handlebars knows what to look for
});
app.set('views', path.join(__dirname, 'views'));
app.engine('html',handlebars.engine);
app.set('view engine', 'html');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/log', serveIndex('./public/log'));
app.use('/angular',express.static(path.join(__dirname, 'angular')));

// Express Session
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 10*24*3600*1000},
    saveUninitialized: true,
    resave: true
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator ???
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.');
      var root    = namespace.shift();
      var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/course', course);
// Set Port
app.set('port', (process.env.PORT || 3000));
log.info( 'Server started on port '+ app.get('port'));
var server = app.listen(app.get('port'), function() {
	console.log('Server started on port '+ app.get('port'));
});

module.exports = server;
//exports.log = log;
