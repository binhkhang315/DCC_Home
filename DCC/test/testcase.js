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