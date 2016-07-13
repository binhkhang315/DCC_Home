var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var acl = require("acl");
var mongodb = require("mongodb");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://lukai.lotho%40gmail.com:conChuot@smtp.gmail.com');
//Encrypt and decrypt function: used for email confirmation
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    passwd = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,passwd)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,passwd)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
// Or Using the mongodb backend
mongodb.connect("mongodb://localhost/loginapp", function(error, db) {
  var mongoBackend = new acl.mongodbBackend(db, "acl_");
  acl = new acl(mongoBackend);
  setRoles();
});
var User = require("../models/user");
// get homepage
router.get("/register", function(req, res) {
  res.render("register");
});
// login route
router.get("/login", function(req, res) {
  res.render("login");
});
// dashboard route is only for admin
router.get("/dashboard", ensureAuthenticated, function(req, res) {
  User.getUserById(req.session.passport.user, function(err, user) {
    acl.isAllowed(user.username, (req.url).split('/')[1], "view", function(err, isAllowed) {
      if (isAllowed) {
        console.log("Access ok " + user.username);
        res.render("dashboard");
      } else {
        console.log("Access denied " + user.username);
        res.render("accessdenied");
      }
    });
  });
});
// confirm email
router.get("/confirm", function(req, res){
  var code = req.query.code;
	var user = decrypt(code);
	User.update({username:user},{$set:{confirmed:true}},{ multi: false },function(err,num){
		req.flash("success_msg", "Your email has been confirmed!");
		res.redirect('/');
	});
});

// ensure authenticated

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error_msg", "Please log in as an admin to view that");
    res.redirect("/");
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
router.post("/register", function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var role = req.body.role;
  var mailOptions = {
    from: '"DCC Mailer 🐉"<lukai.lotho@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Confirmation email 💌', // Subject line
    text: 'Please click the link below to complete registration:', // plaintext body
    html: '<a href="http://'+req.get('host')+'/users/confirm?code='+encrypt(username)+'">Please click here to complete registration ✅</a>'
	};
	transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
	});
  // validation
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password2", "Passwords do not match").equals(req.body.password);
  var errors = req.validationErrors();

  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    // check username was registered or not
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        // user has not registered yet\
        // check email has been registered or not
        User.getUserByEmail(email, function(err, userByEmail) {
          if (err) throw err;
          // if email has not been registered, ok accept
          if (!userByEmail) {
            var newUser = new User({
              name: name,
              email: email,
              username: username,
              password: password,
              role: role,
			        confirmed: false
            });
            User.createUser(newUser, function(err, user) {
              if (err) throw err;
              // add user and role to database
              acl.addUserRoles(username, role);
              //------------------------------
              req.flash("success_msg", "You are registered and can now login");
              res.redirect("/");
            });
          } else {
            console.log("This email has been registed!");
            req.flash("error_msg", "This email has been registed!");
            res.redirect("/");
          }
        });
      } else {
        // username registered
        console.log("This username has been registed!");
        req.flash("error_msg", "This username has been registed!");
        res.redirect("/");
      }
    });
  }
});
// passport Strategy
passport.use(new LocalStrategy(

function(username, password, done) {
  User.getUserByUsername(username, function(err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, {
        message: "Unknow User"
      });
    }
    User.comparePassword(password, user.password, function(err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Invalid password"
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
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true
}),

function(req, res) {
  res.redirect("/");
});
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success_msg", "You are logged out");

  res.redirect("/");
});
//----------------------------------------------------
module.exports = router;
