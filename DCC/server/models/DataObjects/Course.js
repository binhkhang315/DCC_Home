var SequelizeDatatypes = require('sequelize');

module.exports=
{
    name:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: false
    },
        description:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    },
    durationOnClass:
    {
        type: SequelizeDatatypes.TIME,
        allowNull: true
    },
    belong2Session:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    img:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: false
    }
}
