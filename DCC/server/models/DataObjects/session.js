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
    sessiontype:
    {
      type: SequelizeDatatypes.TEXT,
      allowNull: false
    },
    belong2TrainingProgram:
    {
        type: SequelizeDatatypes.INTEGER,
        allowNull: false
    },
    img:
    {
        type: SequelizeDatatypes.TEXT,
        allowNull: true
    }
};
