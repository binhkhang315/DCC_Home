var SequelizeDatatypes = require('sequelize');

module.exports=
{
    // 1: studying,
    // 2: studied, did not test
    // 3: passed
    status:
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
