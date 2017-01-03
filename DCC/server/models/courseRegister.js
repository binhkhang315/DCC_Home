var log = require('../../config/logConfig');
var _courseRegisterModel=require('./DataObjects/courseRegister');

module.exports = function(sequelize, DataTypes) {
    var courseRegister = sequelize.define('CourseRegister', _courseRegisterModel, {
        classMethods: {

        },

        tableName: 'course_register'
    });
    return courseRegister;
};
