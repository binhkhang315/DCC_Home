/* jshint indent: 2 */
"use strict";
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define('course', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documents: {
            type: DataTypes.STRING,
            allowNull: true
        },
        trainerID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        test: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        classMethods: {
            getCourseList: function(cb) {
                log.info('/models/course: getCourseList() : ');
                var query = {
                    where: {
                        isDeleted: false
                    }
                };
                Course.findAll(query).then(cb);
            },
            getCourseByID: function(id, cb) {
                log.info('/models/course: getCourseByID() : ' + id);
                var query = {
                    where: {
                        id: id
                    }
                };
                Course.findOne(query).then(cb);
            },
            getCourseByName: function(name, cb) {
                log.info('/models/course: getCourseByName() : ' + name);
                var query = {
                    where: {
                        name: name
                    }
                };
                Course.findOne(query).then(cb);
            },
            getCourseByCategory: function(category, cb) {
                log.info('/models/course: getCourseByCategory() : ' + category);
                var query = {
                    where: {
                        category: category
                    }
                };
                Course.findAll(query).then(cb);
            },
            getCourseByTrainerID: function(trainerID, cb) {
                log.info('/models/course: getCourseByTrainerID() : ' + trainerID);
                var query = {
                    where: {
                        trainerID: trainerID
                    }
                };
                Course.findOne(query).then(cb);
            },
        },
        tableName: 'course'
    });
    return Course;
};
