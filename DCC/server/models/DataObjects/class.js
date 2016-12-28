var SequelizeDatatypes = require('sequelize');

module.exports=
{
    className:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    },
    startTime:
    {
        type: SequelizeDatatypes.TIME,
        allowNull: true
    },
    isClosed:
    {
        type: SequelizeDatatypes.BOOLEAN,
        allowNull: true
    },
    maxAttendant:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: true
    },
    courseId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    classRoomId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    trainerId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    }
}
