var log = require('../../config/logConfig');
var _sessionTypeModel=require('./DataObjects/sessionType');

module.exports = function(sequelize, DataTypes) {
    var sessionType = sequelize.define('sessionType', _sessionTypeModel, {
        classMethod: {
            getAllSessionType: function(cb){
                log.info('/models/sessionType: getAllSessionType()')
                sessionType.findAll().then(cb);
            }
        },

        tableName: 'sessionType'
    });
    return sessionType;
};
