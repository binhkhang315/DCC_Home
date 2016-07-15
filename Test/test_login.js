//var request = require('request');
var request = require("supertest");
var server = request.agent("http://localhost:3000");
var assert = require('chai').assert;



//-----------Unit test login-------------

describe("<Unit Test Login>", function ()
{

    describe("", function ()
    {
        return it("Test case 1 : user not found", function (done)
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
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        // res.headers.location is the return value of login fucntion
                        assert.equal(res.headers.location, 'failure', "this is ok!!!!") // if login success, compare with "success" string, otherwise compare with "failure" string !!!!!
                        //console.log(res.headers.location);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
//----------------------------------------------------------------------------------
    describe("", function ()
    {
        return it("Test case 2 : user and pass true", function (done)
        {
            return server
                    .post("/users/login")
                    .send(
                            {
                                username: "thach",
                                password: "123"
                            })
                    .end(function (err, res)
                    {
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        assert.equal(res.headers.location, 'success', "this is ok!!!!")
                        //console.log(res.status);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
//----------------------------------------------------------------------------------
    describe("", function ()
    {
        return it("Test case 3 : user is false, pass is true", function (done)
        {
            return server
                    .post("/users/login")
                    .send(
                            {
                                username: "falseuser",
                                password: "123"
                            })
                    .end(function (err, res)
                    {
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        assert.equal(res.headers.location, 'failure', "this is ok!!!!")
                        //console.log(res.headers.location);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
//----------------------------------------------------------------------------------
    describe("", function ()
    {
        return it("Test case 4 : user is true, pass is false", function (done)
        {
            return server
                    .post("/users/login")
                    .send(
                            {
                                username: "thach",
                                password: "falsepassword"
                            })
                    .end(function (err, res)
                    {
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        assert.equal(res.headers.location, 'failure', "this is ok!!!!")
                        //console.log(res.headers.location);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
//----------------------------------------------------------------------------------
    describe("", function ()
    {
        return it("Test case 5 : user is empty", function (done)
        {
            return server
                    .post("/users/login")
                    .send(
                            {
                                username: "",
                                password: "123"
                            })
                    .end(function (err, res)
                    {
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        assert.equal(res.headers.location, 'failure', "this is ok!!!!")
                        //console.log(res.headers.location);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
//----------------------------------------------------------------------------------
    describe("", function ()
    {
        return it("Test case 6 : password is empty", function (done)
        {
            return server
                    .post("/users/login")
                    .send(
                            {
                                username: "thach",
                                password: ""
                            })
                    .end(function (err, res)
                    {
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        assert.equal(res.headers.location, 'failure', "this is ok!!!!")
                        //console.log(res.headers.location);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
//----------------------------------------------------------------------------------
    describe("", function ()
    {
        return it("Test case 7 : password and user are empty", function (done)
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
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        assert.equal(res.headers.location, 'failure', "this is ok!!!!")
                        //console.log(res.headers.location);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
//----------------------------------------------------------------------------------
    describe("", function ()
    {
        return it("Test case 8 : user true with another pass true", function (done)
        {
            return server
                    .post("/users/login")
                    .send(
                            {
                                username: "thach",
                                password: "456"
                            })
                    .end(function (err, res)
                    {
                        //res.headers.location.should.have.equal("/");
                        //expect(res.status).to.equal(302);
                        assert.equal(res.headers.location, 'failure', "this is ok!!!!")
                        //console.log(res.headers.location);
                        //expect(res.headers.location).to.equal('/auth/success');
                        return done();
                    });
        });
    });
});

//-----------------------------------------------------------------------
