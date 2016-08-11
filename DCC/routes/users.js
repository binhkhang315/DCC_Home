var express = require('express');
var router = express.Router();
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;
var Acl = require('acl');
var AclSeq = require('acl-sequelize');
var Sequelize = require('sequelize');
var ldap = require('ldapjs');
var models = require('../models');

var server = null;
var LDAP_PORT = 389;
// admin's credentials for connecting to openLDAP server
var BASE_OPTS = {
    server: {
        url: 'ldap://192.168.122.51:' + LDAP_PORT.toString(),
        bindDn: 'cn=admin,dc=example,dc=com',
        bindCredentials: '123456',
        searchBase: 'dc=example,dc=com',
        searchFilter: '(mail={{username}})'
    }
};
// Email Setting
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

// Upload file setting
var multer	=	require('multer');
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

var db = new Sequelize('nodejs', 'root', 'dekvn@123321', {
    host: '192.168.122.51',
    dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  port: 3306,
  logging: false
});
var acl       = new Acl(new AclSeq(db, { prefix: 'acl_' }));

models.User.sync();

router.get('/userprofile', function(req, res) {
    log.info('/routes/users: GET /users/userprofile');
    res.render('userprofile');
});

router.get('/userprofileController', function(req, res) {
    log.info('/routes/users: GET /users/userprofileController');
    models.User
      .findOrCreate({
        where: {username: 'admin'},
        defaults: {
          status: 'Im admin',
          dob: '20/10/1995',
          phone: '0123456789',
          location: 'DEK Technologies',
          email: 'dek@dek.vn',
          avatar: '/img/profile.jpg'
        }})
      .then(function(user) {
        res.send({
           pStatus: user[0].dataValues.status,
           pName: user[0].dataValues.username,
           pDoB: user[0].dataValues.dob,
           pPhone: user[0].dataValues.phone,
           pLocation: user[0].dataValues.location,
           pEmail: user[0].dataValues.email,
           pAvatar: user[0].dataValues.avatar
        });
    });
});

router.get('/edituserprofile', function(req, res) {
  log.info('/routes/users: GET /users/edituserprofile');
  res.render('edituserprofile');
});

router.post('/userprofileReturnValue', function(req, res) {
  log.info('/routes/users: Save edit userprofile');
  models.User.update(
  {
    status: req.body.pStatus,
    dob: req.body.pDoB,
    phone: req.body.pPhone,
    location: req.body.pLocation
  },
  {
    where: { username : 'admin' }
  })
  .then(function (result) {
    res.send({
      msg: "Success"
    });
  });
});


router.post('/photo',function(req,res){
  log.info('/routes/users: Upload avatar');
	upload(req,res,function(err) {
    models.User.update(
    {
      avatar: '/img/' + req.file.filename
    },
    {
      where: { username : 'admin' }
    })
    res.render('userprofile');
	});
});

router.get('/trainer', function(req, res) {
    log.info('/routes/users: GET /users/trainer');
    res.render('trainer');
});

// dashboard route is only for admin
router.get('/dashboard', ensureAuthenticated, function(req, res) {
    log.info('/routes/users: GET /users/dashboard');
    res.send('hihi');
});


// ensure authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}
// This creates a set of roles which have permissions on
//  different resources.

function setRoles() {
    acl.allow([{
        roles: 'admin',
        allows: [{
            resources: 'dashboard',
            permissions: 'view'
        }]
    }, {
        roles: 'guest',
        allows: []
    }]);
}
// passport Strategy
passport.use(new LdapStrategy(BASE_OPTS, function(user, callback) {
    // if authenticate success, user is returned here
    return callback(null, user);
}));
// save user's credentials to session
passport.serializeUser(function(user, done) {
    done(null, user.mail);
});
// get user's credentials from session
passport.deserializeUser(function(mail, callback) {
    callback(null, {
        mail: mail
    });
});
router.post('/login', function(req, res, next) {
    passport.authenticate('ldapauth', {
        session: true
    }, function(err, user) {
        if (err) {
            log.error(err);
            return next();
        }
        if (!user) {
            log.info('User login failed.');
            res.send({
                userid: null,
                msg: 'You are not authenticated!'
            });
        } else {
            return req.login(user, function(err) {
                if (err) {
                    log.error(err);
                    return next();
                }
                log.info('User login: ' + user.mail);
                return res.send({
                    userid: user.mail,
                    msg: 'You are authenticated!'
                })
            });
        }
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    log.info('/routes/users: GET /logout');
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
//----------------------------------------------------
module.exports = router;
