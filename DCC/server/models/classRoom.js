var _classRoomModel = require("./DataObjects/classRoom");

module.exports = function(sequelize, DataTypes) {
    var ClassRoom = sequelize.define('ClassRoom', _classRoomModel, {
        classMethods: {

        },

        tableName: 'class_room'
    });
    return ClassRoom;
};
