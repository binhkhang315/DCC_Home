var SequelizeDatatypes = require('sequelize');

module.exports =
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
    img:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    }
};
