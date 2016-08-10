var request = require('supertest');
var assert = require('chai').assert;
var expect = require('chai').expect;
var route = require('../app.js');
var models = require('../models');
models.course.sync({
    force: false
});
// mongoose.connect('mongodb://localhost/loginapp');
// var db = mongoose.connection;

function isEmpty(str) {
    return (!str || 0 === str.length);
};

describe('<Unit Test for Routing>', function() {
    describe('', function() {
        return it('Test case 1 : get / ', function(done) {
            request(route)
                .get('/')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 2 : get /course ', function(done) {
            request(route)
                .get('/course')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 3 : get /course/coursesoverview ', function(done) {
            request(route)
                .get('/course/coursesoverview')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 4 : get /course/trainerdashboard ', function(done) {
            request(route)
                .get('/course/trainerdashboard')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 5 : get /users/userprofile ', function(done) {
            request(route)
                .get('/users/userprofile')
                .expect(200, done)
        });
    });

    describe('', function() {
        return it('Test case 6 : get /users/dashboard ', function(done) {
            request(route)
                .get('/users/dashboard')
                .end(function(err, res) {
                    assert.equal(res.headers.location, '/')
                    return done();
                });
        });
    });
});

//---------------------------------------------------------------------------------------
describe('<Unit test for Login>', function() {

    describe('', function() {
        return it('Test case 1 : Login success', function(done) {
            request(route)
                .post('/users/login')
                .send({
                    username: 'qwe@gmail.com',
                    password: 'qwe'
                })
                .end(function(err, res) {
                    assert.equal(res.body.userid, 'qwe@gmail.com');
                    return done();
                });
        });
    });

    describe('', function() {
        return it('Test case 2 : Login fail, username true, password false', function(done) {
            request(route)
                .post('/users/login')
                .send({
                    username: 'qwe@gmail.com',
                    password: 'thach13'
                })
                .end(function(err, res) {
                    assert.equal(res.body.userid, null);
                    return done();
                });
        });

        describe('', function() {
            return it('Test case 3 : Login fail, username false, password true', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: 'thach1',
                        password: 'qwe'
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 4 : Login fail, username null, password true', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: null,
                        password: 'qwe'
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 5 : Login fail, username true, password null', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: 'qwe@gmail.com',
                        password: null
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 6 : Login fail, username false, password null', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: 'thach2',
                        password: null
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

        describe('', function() {
            return it('Test case 7 : Login fail, username null, password false', function(done) {
                request(route)
                    .post('/users/login')
                    .send({
                        username: null,
                        password: '123'
                    })
                    .end(function(err, res) {
                        assert.equal(res.body.userid, null);
                        return done();
                    });
            });
        });

    });
});
// describe('<Unit test for Course model', function() {
//     describe('Method Course', function() {
//         return it('Test case 1: getCourseByID', function(done) {
//             models.course.getCourseByID('1', function(course) {
//                 assert.equal(course.name, 'CBA Overview');
//                 return done();
//             })
//         });
//     });
//
//     describe('', function() {
//         return it('Test case 2: getCourseByName', function(done) {
//             models.course.getCourseByName('CBA Overview', function(course) {
//                 assert.equal(course.id, '1');
//                 return done();
//             })
//         });
//     });
//     describe('', function() {
//         return it('Test case 3: getCourseByCategory', function(done) {
//             models.course.getCourseByCategory('Technical', function(course) {
//                 assert.equal(course[2].id, '3');
//                 return done();
//             })
//         });
//     });
//
//     describe('', function() {
//         return it('Test case 4: getCourseByTrainerID', function(done) {
//             models.course.getCourseByTrainerID('King Nguyen', function(course) {
//                 assert.equal(course.name, 'LDE');
//                 return done();
//             })
//         });
//     });
// });

// describe('<Unit test for User model', function() {
//     describe('Method User', function() {
//         return it('Test case 1: getUserByID', function(done) {
//             models.User.getUserByID('1', function(user) {
//                 assert.equal(user.username, 'admin');
//                 return done();
//             })
//         });
//     });

//     describe('', function() {
//         return it('Test case 2: getUserByName', function(done) {
//             models.User.getUserByName('admin', function(user) {
//                 assert.equal(user.id, '1');
//                 return done();
//             })
//         });
//     });
// });
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
