var log = require('../../config/logConfig');
var _sessionTypeModel=require('./DataObjects/sessionType');

module.exports = function(sequelize, DataTypes) {
    var sessionType = sequelize.define('SessionType', _sessionTypeModel, {
        classMethods: {
            getAllSessionType: function(cb){
                log.info('/models/sessionType: getAllSessionType()')
                sessionType.findAll().then(cb);
            }
        },

        tableName: 'session_type'
    });
    return sessionType;
};
