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
			server
				.post('/users/login')
				.send(
                {
					username: "admin",
					password: "dekvn123"
                })

				.end(function()
				{
					server
						.get('/users/logout')
						.end(function (err, res)
						{
							assert.equal(res.header.location, '/', "this is ok!!!!")
							done();
						});
				});
		});
	});