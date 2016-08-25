
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define('class', {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laptop: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    date : {
      type: DataTypes.DATE,
      allowNull: true
    },

  },{
    tableName: 'class'
  });
  return Class;
};
