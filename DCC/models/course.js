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
    }
  }, {
    classMethods: {
      getCourseByID: function(id,cb){
        var query = {
          where: {id: id}
        };
        Course.findOne(query).then(cb);
      },
      getCourseByName: function(name,cb){
        var query = {
          where: {name: name}
        };
        Course.findOne(query).then(cb);
      },
      getCourseByCategory: function(category,cb){
        var query = {
          where: {category: category}
        };
        Course.findAll(query).then(cb);
      },
      getCourseByTrainerID: function(trainerID,cb){
        var query = {
          where: {trainerID: trainerID}
        };
        Course.findOne(query).then(cb);
      },
    },
    tableName: 'course'
  });
  return Course;
};
