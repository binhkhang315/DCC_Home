
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

//-----------routing-------------
router.get('/userprofile', function(req, res) {
    log.info('/routes/users: GET /users/userprofile');
    if(req.isAuthenticated())
    res.render('userprofile');
    else res.render('index.html');
});

router.get('/userprofileController', function(req, res) {
    log.info('/routes/users: GET /users/userprofileController');
    if(req.isAuthenticated()){
        models.User
        .findOrCreate({
            where: {username: req.user.mail},
            defaults: {
                status: 'Im admin',
                dob: '20/10/1995',
                phone: '0123456789',
                location: 'DEK Technologies',
                email: req.user.mail,
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
                    pAvatar: user[0].dataValues.avatar,
                    pAdmin: user[0].dataValues.admin,
                    pTrainer: user[0].dataValues.trainer,
                    pTrainee: user[0].dataValues.trainee
                });
            });
        }
    });

    router.get('/edituserprofile', function(req, res) {
        log.info('/routes/users: GET /users/edituserprofile');
        if(req.isAuthenticated())
        res.render('edituserprofile');
        else res.render('index.html');

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
                where: { username: req.user.mail }
            })
            .then(function () {
                res.send({
                    msg: "Success"
                });
            });
        });


        router.post('/photo',function(req,res){
            log.info('/routes/users: Upload avatar');
            // upload avatar
            upload(req,res,function() {
                if (typeof req.file !== "undefined")
                {
                    models.User.update(
                        {
                            avatar: '/img/profiles/' + req.file.filename
                        },
                        {
                            where: { username: req.user.mail }
                        })
                    }
                    res.render('userprofile');
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
                            msg: 'You are not authenticated!'
                        });
                    } else {
                        // else login success
                        return req.login(user, function(err) {
                            if (err) {
                                log.error(err);
                                return next();}
                                log.info('User login: ' + user.mail);
                                return res.send({
                                    userid: user.mail,
                                    msg: 'You are authenticated!'
                                })
                            });
                        }
                    })(req, res, next);
                });
                // destroy session and redirect to homepage when logout
                router.get('/logout', function(req, res) {
                    log.info('/routes/users: GET /logout');
                    req.logout();
                    req.session.destroy();
                    res.redirect('/');
                });
                //----------------------------------------------------
                router.get('/trainingprogram', function(req,res){
                    log.info('/routes/trainingprogram: GET /users/trainingprogram');
                    if(req.isAuthenticated())
                    res.render('trainingprogram');
                    else res.render('index.html');
                })
                router.get('/trainingprogram/catalog', function(req,res){
                    log.info('/routes/trainingprogram: GET /users/trainingprogram');
                    if(req.isAuthenticated())
                    res.render('trainingprogramcatalog');
                    else res.render('index.html');
                })
                module.exports = router;
