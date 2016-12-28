var log = require('../../config/logConfig');
var _sessionModel=require('./DataObjects/session');

module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define('Session', _sessionModel, {
        classMethods: {
            getAllSession: function(cb) {
                log.info('/models/session: getAllSession() : ')
                Session.findAll().then(cb);
            },
            getByID: function(id, cb)
            {
                log.info('/models/session: getByID() : ' + id);
                var query = {
                    where: {
                        id: id
                    }
                };
                Session.findOne(query).then(cb);
            },
        },


        tableName: 'session'
    });

    return Session;
};
