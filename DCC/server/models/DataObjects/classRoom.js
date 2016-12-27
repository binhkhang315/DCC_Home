var SequelizeDatatypes = require('sequelize');

module.exports=
{
    location:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: false
    },
    laptop:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: true
    },
    date:
    {
        type: SequelizeDatatypes.DATE,
        allowNull: true
    }
};
