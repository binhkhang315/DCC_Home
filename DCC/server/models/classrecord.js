var _classrecordModel = require('./DataObjects/classRecord');
module.exports = function(sequelize, DataTypes) {
    var Classrecord = sequelize.define('ClassRecord', _classrecordModel, {
        classMethods: {

        },
        tableName: 'class_record'
    });
    return Classrecord;
};
