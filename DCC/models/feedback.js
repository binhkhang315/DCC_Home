
"use strict";
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

module.exports = function(sequelize, DataTypes) {
  var Feedback = sequelize.define('Feedback', {
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    courseID:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true
    }
  },{
    tableName: 'feedback'
  });
  return Feedback;
};
