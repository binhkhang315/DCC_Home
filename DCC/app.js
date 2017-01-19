var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('passport');
var models = require('./server/models');
var authMiddleware = require('./server/middleware/authMiddleware.js')

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

//register static dir
app.set('partials', path.join(__dirname, '/client'));
app.use(express.static(path.join(__dirname, '/client')));

//register router
// app.use('/',        require('./server/routes/index'));
// app.use('/common',        require('./server/routes/common'));
// app.use('/trainee', ensureAuthenticated, require('./server/routes/trainee'));
// app.use('/trainer', ensureAuthenticated, require('./server/routes/trainer'));
// app.use('/admin',   ensureAuthenticated, require('./server/routes/admin'));
// app.use('/user',    ensureAuthenticated, require('./server/routes/user'));

app.use('/',        require('./server/routes/index.js'));
app.use('/common',        require('./server/routes/common'));
app.use('/trainee', require('./server/routes/trainee'));
app.use('/trainer', require('./server/routes/trainer'));
app.use('/admin', require('./server/routes/admin'));
app.use('/user', require('./server/routes/user'));

//create database tables
models.sequelize.sync({force:false});

// Set Port
app.set('port', (process.env.PORT || 3210));
var server = app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
module.exports = server;
