var log = require('../../config/logConfig');
var _courseTypeModel=require('./DataObjects/courseType');

module.exports = function(sequelize, DataTypes) {
    var courseType = sequelize.define('courseType', _courseTypeModel, {
        classMethod: {
            getAllCourseType: function(cb){
                log.info('/models/courseType: getAllCourseType()')
                courseType.findAll().then(cb);
            }
        },

        tableName: 'CourseType'
    });
    return courseType;
};
