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
    documents:
    {
      type: SequelizeDatatypes.TEXT,
      allowNull: true
    },
    img:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    },
    belong2TraingProgram:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    belong2SessionType:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    }
};
