var request = require('supertest');
var assert = require('chai').assert;
var expect = require('chai').expect;
var mongoose = require('mongoose');
var route = require('../app.js');
// mongoose.connect('mongodb://localhost/loginapp');
// var db = mongoose.connection;

function isEmpty(str) {
  return (!str || 0 === str.length);
};

describe('<Unit test for database>', function(){


  describe('<Unit test for getUserByUsername function>', function() {
    describe('', function() {
      return it('Test case 1 : username is existed in the database', function(done) {
        var User = require('../models/user');
        User.getUserByUsername('dek', function(err, user) {
          assert.equal(isEmpty(user), false)
          done();
        });
      });
    });

    describe('', function() {
      return it('Test case 2 : username did not exist in the database', function(done) {
        var User = require('../models/user');
        User.getUserByUsername('fakeUserThatDidntExsit', function(err, user) {
          assert.equal(user, null)
          done();
        });
      });
    });
  });

  //-----------------------------------------------------------------------

  describe('<Unit test for getUserByEmail function>', function() {
    describe('', function() {
      return it('Test case 1 : email is existed in the database', function(done) {
        var User = require('../models/user');
        User.getUserByEmail('dek@dek.vn', function(err, user) {
          assert.equal(isEmpty(user), false)
          done();
        });
      });
    });

    describe('', function() {
      return it('Test case 2 : email did not exist in the database', function(done) {
        var User = require('../models/user');
        User.getUserByEmail('fakeEmailThatDidntExsit@dek.vn', function(err, user) {
          assert.equal(user, null)
          done();
        });
      });
    });
  });

  //-----------------------------------------------------------------------

  describe('<Unit test for getUserById function>', function() {

    describe('', function() {
      return it('Test case 2 : id did not exist in the database', function(done) {
        var User = require('../models/user');
        User.getUserById('fakeIdThatDidntExsit', function(err, user) {
          assert.equal(user, null)
          done();
        });
      });
    });
  });

  //-----------------------------------------------------------------------

  describe('<Unit test for comparePassword function>', function() {
    describe('', function() {
      return it('Test case 1 : Compare function work ok!', function(done) {
        var User = require('../models/user');
        User.getUserByUsername('dek', function(err, user) {
          User.comparePassword('123', user.password, function(err, isMatch) {
            assert.equal(isMatch, true)
            done();
          });
        });
      });
    });

    describe('', function() {
      return it('Test case 2 : two passwords are different', function(done) {
        var User = require('../models/user');
        User.getUserByUsername('dek', function(err, user) {
          User.comparePassword('123456', user.password, function(err, isMatch) {
            assert.equal(isMatch, false)
            done();
          });
        });
      });
    });

    describe('', function() {
      return it('Test case 3 : test if there are err or not, fail if err appeare', function(done) {
        var User = require('../models/user');
        User.getUserByUsername('dek', function(err, user) {
          User.comparePassword('123', user.password, function(err, isMatch) {
            assert.equal(isMatch, true)
            assert.equal(err, null)
            done();
          });
        });
      });
    });
  });

  //-----------------------------------------------------------------------

  describe('<Unit test for createUser function>', function() {
    describe('', function() {
      return it('Test case 1 : Create a test user', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: 'testcreateUser1',
          email: 'createUser@dek.vn',
          username: 'testcreateUser',
          password: '123',
          role: 'guest',
          confirmed: false
        });
        User.createUser(newUser, function(err, user) {});
        User.getUserByUsername(newUser.username, function(err, user) {
          assert.equal(isEmpty(user), false)
          done();
        });
      });
    });


    describe('', function() {
      return it('Test case 2 : name is empty', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: '',
          email: 'createUser@dek.vn',
          username: 'testcreateUser',
          password: '123',
          role: 'guest',
          confirmed: false
        });
        User.createUser(newUser, function(err, user) {
          assert.equal(newUser.name, '')
          User.getUserByUsername(newUser.username, function(err, user) {
            assert.equal(isEmpty(user), false)
            done();
          });
        });
      });
    });


    describe('', function() {
      return it('Test case 3 : email is empty', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: 'testcreateUser2',
          email: '',
          username: 'testcreateUser',
          password: '123',
          role: 'guest',
          confirmed: false
        });
        User.createUser(newUser, function(err, user) {
          assert.equal(newUser.email, '')
          User.getUserByUsername(newUser.username, function(err, user) {
            assert.equal(isEmpty(user), false)
            done();
          });
        });
      });
    });

    describe('', function() {
      return it('Test case 4 : username is empty', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: 'testcreateUser3',
          email: 'createUser@dek.vn',
          username: '',
          password: '123',
          role: 'guest',
          confirmed: false
        });
        User.createUser(newUser, function(err, user) {
          assert.equal(isEmpty(user), false)
          User.getUserByUsername(newUser.username, function(err, user) {
            assert.equal(isEmpty(user), false)
            done();
          });
        });
      });
    });

    describe('', function() {
      return it('Test case 5 : password is empty', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: 'testcreateUser4',
          email: 'createUser@dek.vn',
          username: 'testcreateUser',
          password: '',
          role: 'guest',
          confirmed: false
        });
        User.createUser(newUser, function(err, user) {
          assert.equal(isEmpty(user), false)
          User.getUserByUsername(newUser.username, function(err, user) {
            assert.equal(isEmpty(user), false)
            done();
          });
        });
      });
    });

    describe('', function() {
      return it('Test case 6 : role is empty', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: 'testcreateUser5',
          email: 'createUser@dek.vn',
          username: 'testcreateUser',
          password: '123',
          role: '',
          confirmed: false
        });
        User.createUser(newUser, function(err, user) {
          assert.equal(isEmpty(user), false)
          User.getUserByUsername(newUser.username, function(err, user) {
            assert.equal(isEmpty(user), false)
            done();
          });
        });
      });
    });


    describe('', function() {
      return it('Test case 7 :  confirmed is empty', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: 'testcreateUser6',
          email: 'createUser@dek.vn',
          username: 'testcreateUser',
          password: '123',
          role: '',
          confirmed: ''
        });
        User.createUser(newUser, function(err, user) {
          assert.equal(isEmpty(user), false)
          User.getUserByUsername(newUser.username, function(err, usertest) {
            assert.equal(isEmpty(usertest), false)
            done();
          });
        });
      });
    });

    describe('', function() {
      return it('Test case 8 :  all are empty', function(done) {
        var User = require('../models/user');
        var newUser = new User({
          name: '',
          email: '',
          username: '',
          password: '',
          role: '',
          confirmed: ''
        });
        User.createUser(newUser, function(err, user) {
          assert.equal(isEmpty(user), false)
          User.getUserByUsername(newUser.username, function(err, user) {
            assert.equal(isEmpty(user), false)
            done();
          });
        });
      });
    });
 });

describe('<Unit Test for Routing>', function() {
  describe('', function() {
    return it('Test case 1 : get / ', function(done) {
      request(route)
        .get('/')
        .expect(200, done)
    });
  });

  describe('', function() {
    return it('Test case 2 : get /users/courses ', function(done) {
      request(route)
        .get('/users/courses')
        .expect(200, done)
    });
  });

  describe('', function() {
    return it('Test case 3 : get /users/coursesoverview ', function(done) {
      request(route)
        .get('/users/coursesoverview')
        .expect(200, done)
    });
  });

  describe('', function() {
    return it('Test case 4 : get /users/trainerdashboard ', function(done) {
      request(route)
        .get('/users/trainerdashboard')
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
          username: 'thach',
          password: 'thach123'
        })
        .end(function(err, res) {
          assert.equal(res.body.userid, 'thach');
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

//-----------------------------------------------------------------------

});
//-----------------------------------------------------------------------
