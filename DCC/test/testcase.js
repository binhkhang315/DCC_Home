var request = require('supertest');
var assert = require('chai').assert;
var expect = require('chai').expect;
var route = require('../app.js');
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
        return it('Test case 2 : Login fail, username true, password false', function(done) {
            request(route)
                .post('/users/login')
                .send({
                    username: 'thach',
                    password: 'thach13'
                })
                .end(function(err, res) {
                    assert.equal(res.body.userid, null);
                    return done();
                });
        });
    });
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
                    username: 'thach',
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
                        password: 'thach123'
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
                        password: 'thach123'
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
                        username: 'thach',
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
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
