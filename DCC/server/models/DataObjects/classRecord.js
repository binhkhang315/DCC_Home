var SequelizeDatatypes = require('sequelize');

module.exports=
{
    isPassed:
    {
        type: SequelizeDatatypes.BOOLEAN,
        allowNull: false
    },
    classId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    traineeId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    }
}
