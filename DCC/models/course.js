/* jshint indent: 2 */
"use strict";
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();
var rq = require('./DataObjects');
var course = new rq.Course.Course();

module.exports = function(sequelize, DataTypes)
{
    var Course = sequelize.define('course', course, {
        classMethods: {
            getCourses: function(cb) {
                log.info('/models/course: getCourses() : ');
                var query = {
                    where: {
                        isDeleted: false
                    }
                };
                Course.findAll(query).then(cb);
            },
            getByID: function(id, cb) {
                log.info('/models/course: getByID() : ' + id);
                var query = {
                    where: {
                        id: id,
                        isDeleted: false
                    }
                };
                Course.findOne(query).then(cb);
            },
            getByName: function(name, cb) {
                log.info('/models/course: getByName() : ' + name);
                var query = {
                    where: {
                        name: name,
                        isDeleted: false
                    }
                };
                Course.findOne(query).then(cb);
            },
            getByCategory: function(category, cb) {
                log.info('/models/course: getByCategory() : ' + category);
                var query = {
                    where: {
                        category: category,
                        isDeleted: false
                    }
                };
                Course.findAll(query).then(cb);
            },
            // getByTrainer: function(trainer, cb) {
            //     log.info('/models/course: getByTrainer() : ' + trainer);
            //     var query = {
            //         where: {
            //             trainer: trainer,
            //             isDeleted: false
            //         }
            //     };
            //     Course.findAll(query).then(cb);
            // },
        },
        tableName: 'Courses'
    });
    return Course;
};
