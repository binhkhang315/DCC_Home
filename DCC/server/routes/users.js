
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;
var Acl = require('acl');
var AclSeq = require('acl-sequelize');
var Sequelize = require('sequelize');
var ldap = require('ldapjs');
var models = require('../models');
var path = require('path');
var server = null;
// admin's credentials for connecting to openLDAP server
var BASE_OPTS = require('../../config/LDAPconfig');
var log = require('../../config/logConfig');

// Upload file setting
var multer	=	require('multer');
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './client/assets/img/profiles');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});
var upload = multer({ storage : storage}).single('userPhoto');
// connect to mysql

var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..','..', 'config', 'config.js'))[env];
var db = new Sequelize(config.database, config.username, config.password, config);

var acl       = new Acl(new AclSeq(db, { prefix: 'acl_' }));
// generate table to mysql
models.User.sync({
    force: false
});

router.post('/updateUserProfile', function(req, res) {
    log.info('/routes/users: Save edit userprofile');
    models.User.update(
        {
            username: req.body.username,
            status: req.body.status,
            dob: req.body.dob,
            phone: req.body.phone,
            role: req.body.role
        },
        {
            where: { email: req.body.email }
        }
    ).then(function () {
        res.send({
            success: true,
            msg: "Success"
        });
    });
});
router.post('/photo',function(req,res){
    log.info('/routes/users: Upload avatar');
    // upload avatar
    upload(req, res, function() {
        if (typeof req.file !== "undefined")
        {
            models.User.update(
                {
                    avatar: '/img/profiles/' + req.file.filename
                },
                {
                    where: { email: req.user.mail }
                }
            )
        }
        res.end({
            success: true,
            msg: "Uploaded your new profile image"
        });
    });
});
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
// destroy session and redirect to homepage when logout
router.get('/logout', function(req, res) {
    log.info('/routes/users: GET /logout');
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
