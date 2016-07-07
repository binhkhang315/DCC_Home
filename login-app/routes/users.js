var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var acl = require("acl");
var mongodb = require("mongodb")
// Or Using the mongodb backend

mongodb.connect("mongodb://localhost/loginapp", function(error, db) {
	var mongoBackend = new acl.mongodbBackend(db, "acl_");
	acl = new acl(mongoBackend);
  setRoles();
});

var User = require("../models/user");
// get homepage
router.get("/register", function(req, res){
  res.render("register");
});

// login route
router.get("/login", function(req, res){
  res.render("login");
});

// dashboard route is only for admin
router.get("/dashboard", function(req, res){
  User.getUserById(req.session.passport.user,function(err,user){
    acl.isAllowed(user.username,(req.url).split('/')[1],"view",function(err, isAllowed){
      if (isAllowed){
        console.log("Access ok " + user.username);
        res.render("dashboard");
      }
      else{
        console.log("Access denied "+ user.username);
        res.render("accessdenied");
      }
    });
  });
});

// ensure authenticated
function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  else {
    //req.flash("error_msg","You are not logged in");
    res.redirect("/users/login");
  }
}
// This creates a set of roles which have permissions on
//  different resources.
function setRoles(){
  acl.allow([
    {
        roles: 'admin',
        allows: [
            { resources: 'dashboard', permissions: 'view' }
        ]
    },
    {
        roles: 'guest',
        allows: []
    }
 ]);
}

// register user
router.post("/register", function(req, res){
  var name = req.body.name;
  var email = req.body.email; // you have to check this email
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var role = req.body.role;
  // test router.post function : good !!!
  //console.log(name + "\n" + email + "\n" + username + "\n" + password);
  console.log(role);
  // validation
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("username", "Username is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password2", "Passwords do not match").equals(req.body.password);

  var errors = req.validationErrors();

  if (errors){
    res.render("register", {
      errors: errors
    });
  }
  else {
    // user contribute
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      role: role
    });
    User.createUser(newUser, function(err, user){
      if (err) throw err;
      console.log(user);
      // add user and role to database
      acl.addUserRoles(username,role);
  });
    req.flash("success_msg","You are registered and can now login");
    res.redirect("/users/login");
  }
});
// passport Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
        if (err) throw err;
        if (!user){
          return done(null, false, {message: "Unknow User"});
        }

        User.comparePassword(password, user.password, function (err, isMatch){
          if (err) throw err;
          if (isMatch){
            return done(null, user);
          }
          else {
            return done(null, false, {message: "Invalid password"});
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
  });

router.post('/login',
  passport.authenticate('local', {successRedirect:"/", failureRedirect:"/users/login", failureFlash: true}),
  function(req, res) {
    res.redirect("/");
  });

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success_msg", "You are logged out");

  res.redirect("/");
});

module.exports = router;
