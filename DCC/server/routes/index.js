var express = require('express');
var router = express.Router();
var gcal = require('../../config/google_api/gcal.js');
var log = require('../../config/logConfig');
var Sequelize = require('sequelize');
var ldap = require('ldapjs');
var models = require('../models');
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;
// admin's credentials for connecting to openLDAP server
var BASE_OPTS = require('../../config/LDAPconfig');


// get homepage
router.get('/', function(req, res) {
    res.render('./index');
});

router.get('/getEvents', function(req, res) {
    var events = null;
    gcal.getEvents(function( eventList)
    {
        res.send(eventList);
    });
    //res.send(events)
});

// passport Strategy
passport.use(new LdapStrategy(BASE_OPTS, function(user, callback) {
    // if authenticate success, user is returned here
    return callback(null, user);
}));

router.post('/login', function(req, res, next) {
    log.info('Post /login');
    passport.authenticate('ldapauth', {
        // using session to save user's credentials
        session: true
    }, function(err, user) {
        // if err, log err
        if (err) {
            log.error(err);
            return next();
        }
        // if user does not exist, login fail
        if (!user) {
            log.info('User login failed.');
            res.send({
                userid: null,
                success: false,
                msg: 'Wrong email or password',
            });
        } else {
            // save user's credentials to session
            passport.serializeUser(function(user, done) {
                done(null, user.mail);
            });
            // get user's credentials from session
            passport.deserializeUser(function(email, callback) {
                callback(null, {
                    email: email
                });
            });

            // else login success
            return req.login(user, function(err) {
                if (err) {
                    log.error(err);
                    return next();
                }
                log.info('User login: ' + user.mail);
                models.User.findOrCreate({
                    where: {email: req.user.mail},
                    defaults: {
                        username: 'Your Name',
                        status: 'some status',
                        dob: '01/01/2001',
                        phone: '0000 000 000',
                        location: 'DEK Vietnam',
                        email: req.user.mail,
                        avatar: '/img/profiles/defaultProfile.jpg',
                        role: 3, //default user is a trainee
                        belong2Team: 'Team 7Up',
                        isExperienced: 0,
                    }
                })
                .then(function(user) {
                    res.send({
                        username: user[0].dataValues.username,
                        status: user[0].dataValues.status,
                        dob: user[0].dataValues.dob,
                        phone: user[0].dataValues.phone,
                        location: user[0].dataValues.location,
                        email: user[0].dataValues.email,
                        avatar: user[0].dataValues.avatar,
                        role: user[0].dataValues.role,
                        trainer: user[0].dataValues.trainer,
                        trainee: user[0].dataValues.trainee,
                        belong2Team: user[0].dataValues.belong2Team,
                        isExperienced: user[0].dataValues.isExperienced,

                        success: true,
                        msg: 'You are authenticated!'
                    });
                });

            });
        }
    }) (req, res, next);
});

router.get('/isLogin', function(req, res) {
    if (req.isAuthenticated()){
        res.send({
            success: true,
            msg: "You are logged in"
        });
    }else{
        res.send({
            success: false,
            msg: "You are NOT logged in"
        });
    }
})

router.get('/logout', function(req, res) {
    // destroy session and redirect to homepage when logout
    log.info('GET /logout');
    req.logout();
    req.session.destroy();
    res.send({
        success: true,
        msg: "Logout successfully"
    });

});

module.exports = router;
