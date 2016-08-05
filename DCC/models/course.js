/* jshint indent: 2 */
var Sequelize = require('sequelize');
var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
var log = require('simple-node-logger').createLogManager(opts).createLogger();

var sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

var Course = module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course', {
    courseID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    document: {
      type: DataTypes.STRING,
      allowNull: true
    },
    trainerID: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    feedbackID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'feedback',
        key: 'feedbackID'
      }
    }
  }, {
    tableName: 'course'
  });
};
