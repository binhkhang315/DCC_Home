var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var acl = require('acl');
var mongodb = require('mongodb');
// Email Setting

var delog = require('../delog');

// Or Using the mongodb backend
mongodb.connect('mongodb://localhost/loginapp', function(error, db) {
  var mongoBackend = new acl.mongodbBackend(db, 'acl_');
  acl = new acl(mongoBackend);
  setRoles();
});
var User = require('../models/user');

router.get('/register', function(req, res) {
  res.render('register');
});
router.get('/courses', function(req, res) {
  res.render('courses');
});
router.get('/coursesoverview', function(req, res) {
  res.render('coursesoverview');
});
router.get('/trainerdashboard', function(req, res) {
  res.render('trainerdashboard');
});
router.get('/userprofile', function(req, res) {
  res.render('userprofile');
});
// dashboard route is only for admin
router.get('/dashboard', ensureAuthenticated, function(req, res) {
  User.getUserById(req.session.passport.user, function(err, user) {
    acl.isAllowed(user.username, (req.url).split('/')[1], 'view', function(err, isAllowed) {
      if (isAllowed) {
        res.render('dashboard');
      } else {
        res.render('accessdenied');
      }
    });
  });
});


// ensure authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    req.flash('error_msg', 'Please log in as an admin to view that');
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
// register user
router.post('/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  var role = req.body.role;
  delog(req.body);


  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors
    });
  }
  else {
    // check username was registered or not
    User.getUserByUsername(username, function(err, user) {
      if (err)
        throw err;
      if (!user) {
        // user has not registered yet\
        // check email has been registered or not
        User.getUserByEmail(email, function(err, userByEmail) {
          if (err)
            throw err;
          // if email has not been registered, ok accept
          if (!userByEmail) {
            var newUser = new User({
              name: name,
              email: email,
              username: username,
              password: password,
              role: role
            });
            User.createUser(newUser, function(err) {
              if (err)
                throw err;
              // add user and role to database
              acl.addUserRoles(username, role);
              //------------------------------

              req.flash('success_msg', 'You are registered.');
              res.redirect('/');
            });
          }
          else {
            req.flash('error_msg', 'This email has been registed!');
            res.redirect('/#registedfail');
          }
        });
      }
      else {
        // username registered
        req.flash('error_msg', 'This username has been registed!');
        res.redirect('/#registedfail');
      }
    });
  }
});
// passport Strategy
passport.use(new LocalStrategy(

function(username, password, done) {
  User.getUserByUsername(username, function(err, user) {
    if (err)
      throw err;
    if (!user) {
      return done(null, false, {
        message: 'Unknow User'
      });
    }
    User.comparePassword(password, user.password, function(err, isMatch) {
      if (err)
        throw err;
      if (isMatch) {
        return done(null, user);
      }
      else {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
    });
  });
}));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
})
router.post('/login',
  passport.authenticate('local', {
    successRedirect: 'success',
    failureRedirect: 'failure',
    failureFlash: true
  }),

  function(req, res) {
    res.redirect('/');
});

router.get('/success',function(req,res){
  res.redirect('/');
});
router.get('/failure', function(req, res){
  res.redirect('/');
});

router.get('/logout', function(req, res) {

  req.logout();
  req.flash('success_msg', 'You are logged out');
  req.session.destroy();
  res.redirect('/');
});
//----------------------------------------------------
module.exports = router;
