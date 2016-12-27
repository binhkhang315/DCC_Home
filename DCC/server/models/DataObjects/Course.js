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

    img:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: false
    },
    documents:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    },
    test:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    },
    belong2Session:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    }
}
