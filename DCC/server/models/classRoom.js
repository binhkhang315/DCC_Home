var _classRoomModel = require("./DataObjects/classRoom");

module.exports = function(sequelize, DataTypes) {
    var ClassRoom = sequelize.define('classRoom', _classRoomModel, {
        classMethods: {

        },

        tableName: 'classRoom'
    });
    return ClassRoom;
};
