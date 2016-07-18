//var request = require('request');
var request = require("supertest");
var server = request.agent("http://192.168.122.51");
var assert = require('chai').assert;


//Test for authentication
describe("Test for Authentication #1", function ()
{
    return it("Login should fail if username and password are invalid ", function (done)
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


describe("Test for Authentication #2", function ()
{
    it("Login should fail if username is valid but password is invalid ", function (done)
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

describe("Test for Authentication #3", function ()
{
    return it("Login should fail if username is invalid but password is valid", function (done)
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

describe("Test for Authentication #4", function ()
{
    return it("Login should fail if username and pw are blank", function (done)
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

describe("Test for Authentication #5", function ()
{
    return it("Login should fail if username is blank and pw is valid", function (done)
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


describe("Test for Authentication #6", function ()
{
    return it("Login should success if username and pw are valid", function (done)
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


describe("Test for Authentication #7", function ()
{
    return it("Login should fail if username is valid, password is blank", function (done)
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

describe("<Unit Test Register >", function ()
{
    describe("", function ()
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
    });


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

    describe("", function ()
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


    describe("", function ()
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
    });





    describe("", function ()
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
    });

});

//-----------------------------------------------------------------------