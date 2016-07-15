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