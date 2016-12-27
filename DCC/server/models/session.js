var log = require('../../config/logConfig');
var _sessionModel=require('./DataObjects/session');

module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define('session', _sessionModel, {
        classMethod:
        {
            getAllSession: function(cb){
                log.info('/models/session: getAllSession() : ')
                Session.findAll().then(cb);
            }
        },

        tableName: 'session'
    });
    return Session;
};
