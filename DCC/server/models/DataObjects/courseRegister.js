var SequelizeDatatypes = require('sequelize');

module.exports =
{
    traineeId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    courseId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
}
