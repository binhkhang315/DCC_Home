var _courseModel = require('./DataObjects/Course');
var log = require('../../config/logConfig');
var models = require("./index");

module.exports = function(sequelize) {
    var Course = sequelize.define('Course', _courseModel, {
        classMethods: {
            getCourses: function(cb)
            {
                log.info('/models/course: getCourses()');
                Course.findAll().then(cb);
            },

            getByID: function(id, cb)
            {
                log.info('/models/course: getByID() : ' + id);
                var query = {
                    where: {
                        id: id
                    }
                };
                Course.findOne(query).then(cb);
            },

            getByName: function(name, cb)
            {
                log.info('/models/course: getByName() : ' + name);
                var query = {
                    where: {
                        name: name
                    }
                };
                Course.findOne(query).then(cb);
            }
        },

        tableName: 'course'
    });
    return Course;
};
