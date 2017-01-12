var SequelizeDatatypes = require('sequelize');

module.exports=
{
    // 1: enrolled,
    // 2: passed
    status:
    {
        type: SequelizeDatatypes.STRING,
        allowNull: true
    },
    classId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: true
    },
    traineeId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: true
    },
    trainee_request_open:
    {
        type: SequelizeDatatypes.BOOLEAN,
        allowNull: true
    }
}
