var request = require("supertest");
var server = request.agent("http://192.168.122.51");
var assert = require('chai').assert;
var expect = require('chai').expect;
var mongoose = require('mongoose');
var delog = require('../delog');
var route = require('../app.js');
//mongoose.connect('mongodb://localhost/loginapp');
//var db = mongoose.connection;

function isEmpty(str) {
    return (!str || 0 === str.length);
}
describe("<Unit Test for Routing>", function (){
  describe("", function ()
  {
      return it("Test case 1 : get / ", function (done)
      {
          request(route)
            .get('/')
            .expect(200,done)
      });
  });

  describe("", function ()
  {
      return it("Test case 2 : get /users/courses ", function (done)
      {
          request(route)
            .get('/users/courses')
            .expect(200,done)
      });
  });

  describe("", function ()
  {
      return it("Test case 3 : get /users/success ", function (done)
      {
          request(route)
            .get('/users/success')
            .expect(302,done)
      });
  });

  describe("", function ()
  {
      return it("Test case 4 : get /users/coursesoverview ", function (done)
      {
          request(route)
            .get('/users/coursesoverview')
            .expect(200,done)
      });
  });

  describe("", function ()
  {
      return it("Test case 5 : get /users/trainerdashboard ", function (done)
      {
          request(route)
            .get('/users/trainerdashboard')
            .expect(200,done)
      });
  });

  describe("", function ()
  {
      return it("Test case 6 : get /users/userprofile ", function (done)
      {
          request(route)
            .get('/users/userprofile')
            .expect(200,done)
      });
  });

  describe("", function ()
  {
    return it("Test case 7 : get /users/dashboard ", function (done)
    {
        request(route)
          .get('/users/dashboard')
          .end(function (err, res)
          {
             assert.equal(res.headers.location, '/', "this is ok!!!!")
             return done();
          });
    });
  });

  describe("", function ()
  {
    return it("Test case 8 : get /courses ", function (done)
    {
        return server
                .get("/users/courses")
                .end(function (err, res)
                {
                assert.equal(res.statusCode, '200', "this is ok!!!!")
                return done();
                });
    });
  });
  
	describe("", function ()
	{
		return it("Test case 9 : get /courses ", function (done)
		{
			return server
					.get("/users/courses")
					.end(function (err, res)
					{
					assert.equal(res.statusCode, '200', "this is ok!!!!")
					return done();
					});
		});
	});
	
	describe("", function ()
	{
		return it("Test case 10 : get /coursesoverview ", function (done)
		{
			return server
					.get("/users/coursesoverview")
					.end(function (err, res)
					{
					assert.equal(res.statusCode, '200', "this is ok!!!!")
					return done();
					});
		});
	});
	
	describe("", function ()
	{
		return it("Test case 11 : redirect /success ", function (done)
		{
			return server
					.get("/users/success")
					.end(function (err, res)
					{
					assert.equal(res.statusCode, '302', "this is ok!!!!")
					return done();
					});
		});
	}); 
	
	describe("", function ()
	{
		return it("Test case 12 : redirect /failure ", function (done)
		{
			request(route)
					.get("/users/failure")
					.end(function (err, res)
					{
						assert.equal(res.headers.location, '/', "this is ok!!!!")
						return done();
					});
		});
	}); 
	
 	describe("", function ()
	{
		return it("Test case 13 : get /logout ", function (done)
		{
			return server
					.get("/users/logout")
					.end(function (err, res)
					{
					assert.equal(res.header.location, '/', "this is ok!!!!")
					return done();
					});
		});
	}); 
	
 	describe("", function ()
	{
		return it("Test case 14 : get /trainer ", function (done)
		{
			request(route)
					.get("/users/trainer")
					.expect(200,done)
		});
	}); 	
	
 	describe("", function ()
	{
		return it("Test case 15 : get /studentlist ", function (done)
		{
			request(route)
					.get("/users/studentlist")
					.expect(200,done)
		});
	}); 	
	
});

///////////////////////////////////////////////////////////////////////////////////////////////////

describe("<Unit test for Login>", function ()
{
	describe("", function ()
	{
		return it("Test case 1 : Login success", function (done)
		{
			request(route)
				.post('/users/login')
				.send(
                {
					username: "admin",
					password: "dekvn123"
                })

				.end(function (err, res)
				{
					assert.equal(res.headers.location, 'success', "this is ok!!!!")
					return done();
				});
		});
	});
	
	describe("", function ()
	{
		return it("Test case 2 : username did not exist, login fail", function (done)
		{
			request(route)
				.post('/users/login')
				.send(
                {
					username: "fakeUser",
					password: "fakeUser"
                })

				.end(function (err, res)
				{
					assert.equal(res.headers.location, 'failure', "this is ok!!!!")
					return done();
				});
		});
	});
	
	describe("", function ()
	{
		return it("Test case 3 : username true, password false. Login fail", function (done)
		{
			request(route)
				.post('/users/login')
				.send(
                {
					username: "admin",
					password: "fakeUser"
                })

				.end(function (err, res)
				{
					assert.equal(res.headers.location, 'failure', "this is ok!!!!")
					return done();
				});
		});
	});
});

//-----------------------------------------------------------------------

describe("<Unit Test Register >", function ()
{
   /* describe("", function ()
	{
      return it("Test case 1 : register success", function (done)
      {
          request(route)
            .post('/users/register')
            .send(
				{
					name: "testRegisterForTest",
					username: "testRegisterForTest",
					email: "testRegisterForTest@dek.vn",
					password: "testRegisterForTest",
					role: "admin"
				})
			.end(function (err, res)
			{
				assert.equal(res.headers.location, '/', "this is ok!!!!")
				return done();
            });
		});
	});
	*/
	describe("", function ()
	{
      return it("Test case 2 : username is existed, register fail", function (done)
      {
          request(route)
            .post('/users/register')
            .send(
				{
					name: "testRegister2",
					username: "testRegister",
					email: "testRegister2@dek.vn",
					password: "testRegister",
					role: "admin"
				})
			.end(function (err, res)
			{
				assert.equal(res.headers.location, '/#registedfail', "this is ok!!!!")
				return done();
            });
		});
	});
		
	describe("", function ()
	{
      return it("Test case 3 : email is existed, register fail", function (done)
      {
          request(route)
            .post('/users/register')
            .send(
				{
					name: "testRegister3",
					username: "testRegister3",
					email: "testRegister@dek.vn",
					password: "testRegister",
					role: "admin"
				})
			.end(function (err, res)
			{
				assert.equal(res.headers.location, '/#registedfail', "this is ok!!!!")
				return done();
            });
		});
	});
});

//-----------------------------------------------------------------------

describe("<Unit test for getUserByUsername function>", function ()
{
    describe("", function ()
    {
        return it("Test case 1 : username is existed in the database", function (done)
        {
            var User = require('../models/user');
			User.getUserByUsername('dek', function(err, user) {
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				done();
			});
        });
    });

	describe("", function ()
    {
        return it("Test case 2 : username didn't exist in the database", function (done)
        {
            var User = require('../models/user');
			User.getUserByUsername('fakeUserThatDidntExsit', function(err, user) {
				assert.equal(user, null, "This is ok!!!!")
				done();
			});
        });
    });
});

//-----------------------------------------------------------------------

describe("<Unit test for getUserByEmail function>", function ()
{
    describe("", function ()
    {
        return it("Test case 1 : email is existed in the database", function (done)
        {
            var User = require('../models/user');
			User.getUserByEmail('dek@dek.vn', function(err, user) {
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				done();
			});
        });
    });

	describe("", function ()
    {
        return it("Test case 2 : email didn't exist in the database", function (done)
        {
            var User = require('../models/user');
			User.getUserByEmail('fakeEmailThatDidntExsit@dek.vn', function(err, user) {
				assert.equal(user, null, "This is ok!!!!")
				done();
			});
        });
    });
});

//-----------------------------------------------------------------------

describe("<Unit test for getUserById function>", function ()
{
    /*describe("", function ()
    {
        return it("Test case 1 : id is existed in the database", function (done)
        {
            var User = require('../models/user');
			User.getUserById('578f3fe845752574196f202c', function(err, user) {
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				done();
			});
        });
    });*/

	describe("", function ()
    {
        return it("Test case 2 : id didn't exist in the database", function (done)
        {
            var User = require('../models/user');
			User.getUserById('fakeIdThatDidntExsit', function(err, user) {
				assert.equal(user, null, "This is ok!!!!")
				done();
			});
        });
    });
});

//-----------------------------------------------------------------------

describe("<Unit test for comparePassword function>", function ()
{
    describe("", function ()
    {
        return it("Test case 1 : Compare function work ok!", function (done)
        {
            var User = require('../models/user');
			User.getUserByUsername('dek', function(err, user) {
				User.comparePassword('123', user.password, function(err, isMatch) {
				assert.equal(isMatch, true, "This is ok!!!!")
				done();
				});
			});
        });
    });

	describe("", function ()
    {
        return it("Test case 2 : two passwords are different", function (done)
        {
			var User = require('../models/user');
			User.getUserByUsername('dek', function(err, user) {
				User.comparePassword('123456', user.password, function(err, isMatch) {
				assert.equal(isMatch, false, "This is ok!!!!")
				done();
				});
			});
        });
    });

	describe("", function ()
    {
        return it("Test case 3 : test if there are err or not, fail if err appeare", function (done)
        {
			var User = require('../models/user');
			User.getUserByUsername('dek', function(err, user) {
				User.comparePassword('123', user.password, function(err, isMatch) {
				assert.equal(isMatch, true, "This is ok!!!!")
				assert.equal(err, null, "This is ok!!!!")
				done();
				});
			});
        });
    });
});

//-----------------------------------------------------------------------

describe("<Unit test for createUser function>", function ()
{
    describe("", function ()
    {
        return it("Test case 1 : Create a test user", function (done)
        {
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
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				done();
			});
        });
    });


    describe("", function ()
    {
        return it("Test case 2 : name is empty", function (done)
        {
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
				assert.equal(newUser.name, '', "This is ok!!!!")
				User.getUserByUsername(newUser.username, function(err, user) {
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				done();
				});
			});
		});
   });


    describe("", function ()
    {
        return it("Test case 3 : email is empty", function (done)
        {
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
				assert.equal(newUser.email, '', "This is ok!!!!")
				User.getUserByUsername(newUser.username, function(err, user) {
					assert.equal(isEmpty(user), false, "This is ok!!!!")
					done();
				});
			});
        });
    });

    describe("", function ()
    {
        return it("Test case 4 : username is empty", function (done)
        {
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
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				User.getUserByUsername(newUser.username, function(err, user) {
					assert.equal(isEmpty(user), false, "This is ok!!!!")
					done();
				});
			});
        });
    });

    describe("", function ()
    {
        return it("Test case 5 : password is empty", function (done)
        {
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
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				User.getUserByUsername(newUser.username, function(err, user) {
					assert.equal(isEmpty(user), false, "This is ok!!!!")
					done();
				});
			});
        });
    });

    describe("", function ()
    {
        return it("Test case 6 : role is empty", function (done)
        {
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
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				User.getUserByUsername(newUser.username, function(err, user) {
					assert.equal(isEmpty(user), false, "This is ok!!!!")
					done();
				});
			});
        });
    });


    describe("", function ()
    {
        return it("Test case 7 :  confirmed is empty", function (done)
        {
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
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				User.getUserByUsername(newUser.username, function(err, usertest) {
					assert.equal(isEmpty(usertest), false, "This is ok!!!!")
					done();
				});
			});
        });
    });

	describe("", function ()
    {
        return it("Test case 8 :  all are empty", function (done)
        {
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
				assert.equal(isEmpty(user), false, "This is ok!!!!")
				User.getUserByUsername(newUser.username, function(err, user) {
					assert.equal(isEmpty(user), false, "This is ok!!!!")
					done();
				});
			});
        });
    });
});

//-----------------------------------------------------------------------
describe("", function ()
{
    return it("Test case 5 : register with exist user but different email ", function (done)
    {
        return server
                .get("/")
                .end(function (err, res)
                {
        assert.equal(res.statusCode, '200', "this is ok!!!!")
        return done();
                });
    });
});
//-----------------------------------------------------------------------
