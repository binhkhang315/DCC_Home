var SequelizeDatatypes = require('sequelize');

module.exports=
{
    className:
    {
      type: SequelizeDatatypes.TEXT,
      allowNull: true
    },
    classRoom:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    sessionId:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    trainer:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
      isClosed:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: true
    },
    maxAttendant:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: true
    },
}
