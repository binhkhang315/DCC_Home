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
