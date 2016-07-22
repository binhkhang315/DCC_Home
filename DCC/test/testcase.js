var request = require("supertest");
var server = request.agent("http://192.168.122.51");
var assert = require('chai').assert;
var expect = require('chai').expect;
var mongoose = require('mongoose');
var delog = require('../delog');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

function isEmpty(str) {
    return (!str || 0 === str.length);
}


describe("<Unit test for Login>", function ()
{
	describe("", function ()
	{
		return it("Test case 1 : Login should fail if username and password are invalid ", function (done)
		{
			return server
				.post("/users/login")
				.send(
				{
					username: "qwe",
					password: "123"
				})
				.end(function (err, res)
				{
					assert.equal(res.headers.location, 'failure') // if login success, compare with "success" string, otherwise compare with "failure" string !!!!!
					return done();
				});
				done();
		});
	});

	describe("", function ()
	{
		it("Test case 2 : Login should fail if username is valid but password is invalid ", function (done)
		{
			return server
				.post("/users/login")
				.send(
				{
					username: "anhnguyen",
					password: "wrong_password"
				})
				.end(function (err, res)
				{
					assert.equal(res.headers.location, 'failure')
					return done();
				});
		});
	});

	describe("", function ()
	{
		return it("Test case 3 : Login should fail if username is invalid but password is valid", function (done)
		{
			return server
				.post("/users/login")
				.send(
				{
					username: "wrong_username",
					password: "dekvn123456"
				})
				.end(function (err, res)
				{
					assert.equal(res.headers.location, 'failure')
					return done();
				});
		});
	});

	describe("", function ()
	{
		return it("Test case 4 : Login should fail if username and pw are blank", function (done)
		{
			return server
				.post("/users/login")
				.send(
				{
					username: "",
					password: ""
				})
				.end(function (err, res)
				{
					assert.equal(res.headers.location, 'failure')
					return done();
				});
		});
	});

	describe("", function ()
	{
		return it("Test case 5 : Login should fail if username is blank and pw is valid", function (done)
		{
			return server
                .post("/users/login")
                .send(
                 {
                    username: "",
                    password: "dekvn123456"
                })
                .end(function (err, res)
                {
                    assert.equal(res.headers.location, 'failure')
                    done();
                });
		});
	});

	describe("", function ()
	{
		return it("Test case 6 : Login should success if username and pw are valid", function (done)
		{
			return server
                .post("/users/login")
                .send(
                    {
                    username: "anhnguyen",
                    password: "dekvn123456"
                    })
                .end(function (err, res)
                {
                    assert.equal(res.headers.location, 'success')
                    return done();
                });
		});
	});

	describe("", function ()
	{
		return it("Test case 7 : Login should fail if username is valid, password is blank", function (done)
		{
        return server
                .post("/users/login")
                .send(
                {
                    username: "anhnguyen",
                    password: ""
                 })
                .end(function (err, res)
                {
                    assert.equal(res.headers.location, 'failure')
                    return done();
                });
		});
	});
});

//-----------------------------------------------------------------------

describe("<Unit Test Register >", function ()
{
    /*describe("", function ()
    {
        return it("Test case 1 : true with role is admin", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "admin",
                                username: "admin",
                                email: "admin@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "admin"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.headers.location, '/', "this is ok!!!!")
						return done();
                    });
        });
    });

    describe("", function ()
    {
        return it("Test case 2 : true with role is guest", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "guest",
                                username: "guest",
                                email: "guest@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "guest"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.headers.location, '/', "this is ok!!!!")
						return done();
                    });
        });
    });*/


    describe("", function ()
    {
        return it("Test case 3 : register with exist user but with role is admin", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "admin",
                                username: "admin",
                                email: "admin@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
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
        return it("Test case 4 : register with exist user but with role is guest", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "guest",
                                username: "guest",
                                email: "guest@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "guest"
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
        return it("Test case 5 : register with exist user but different email ", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "guest",
                                username: "guest",
                                email: "guestWithDifferentEmail@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "guest"
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
        return it("Test case 6 : register with exist user with different password ", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "guest",
                                username: "guest",
                                email: "guest6@dek.vn",
                                password: "dekvn123456",
								password2: "dekvn123456",
								role: "guest"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.headers.location, '/#registedfail', "this is ok!!!!")
						return done();
                    });
        });
    });

    /*describe("", function ()
    {
        return it("Test case 7 : email empty", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "test7",
                                username: "test7",
                                email: "",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "guest"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.status, '200', "this is ok!!!!")
						return done();
                    });
        });
    });

    describe("", function ()
    {
        return it("Test case 8 : username empty", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "test8",
                                username: "",
                                email: "test7@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "guest"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.status, '200', "this is ok!!!!")
						return done();
                    });
        });
    });

    describe("", function ()
    {
        return it("Test case 9 : name empty", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "",
                                username: "test9",
                                email: "test9@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "guest"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.status, '200', "this is ok!!!!")
						return done();
                    });
        });
    });

    describe("", function ()
    {
        return it("Test case 10 : password empty ", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "test10",
                                username: "test10",
                                email: "test10@dek.vn",
                                password: "",
								password2: "dekvn123",
								role: "guest"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.status, '200', "this is ok!!!!")
						return done();
                    });
        });
    });

    describe("", function ()
    {
        return it("Test case 11 : password2 empty ", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "test11",
                                username: "test11",
                                email: "test11@dek.vn",
                                password: "dekvn123",
								password2: "",
								role: "test11"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.status, '200', "this is ok!!!!")
						return done();
                    });
        });
    });


    /*describe("", function ()
    {
        return it("Test case 12 : role empty ", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "test12",
                                username: "test12",
                                email: "test12@dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: ""
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.headers.location, '/', "this is ok!!!!")
						return done();
                    });
        });
    });*/





    /*describe("", function ()
    {
        return it("Test case 13 : all information empty ", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "",
                                username: "",
                                email: "",
                                password: "",
								password2: "",
								role: ""
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.status, '200', "this is ok!!!!")
						return done();
                    });
        });
    });


    describe("", function ()
    {
        return it("Test case 14 : email don't have @", function (done)
        {
            return server
                    .post("/users/register")
                    .send(
                            {
                                name: "test14",
                                username: "test14",
                                email: "test14dek.vn",
                                password: "dekvn123",
								password2: "dekvn123",
								role: "test14"
                            })
                    .end(function (err, res)
                    {
						assert.equal(res.status, '200', "this is ok!!!!")
						return done();
                    });
        });
    });*/

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
