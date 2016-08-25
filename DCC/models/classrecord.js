
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

module.exports = function(sequelize, DataTypes) {
  var Classrecord = sequelize.define('class_record', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  },{
    tableName: 'classrecord'
  });
  return Classrecord;
};
