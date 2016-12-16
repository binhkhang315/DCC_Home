var SequelizeDatatypes = require('sequelize');

module.exports =
{
    name:
    {
      type: SequelizeDatatypes.STRING,
      allowNull: false
    },
    description:
    {
      type: SequelizeDatatypes.TEXT,
      allowNull: true
    },
    category:
    {
      type: SequelizeDatatypes.STRING,
      allowNull: false
    },
    documents:
    {
      type: SequelizeDatatypes.STRING,
      allowNull: true
    },
    test:
    {
      type: SequelizeDatatypes.STRING,
      allowNull: true
    },
    isDeleted:
    {
      type: SequelizeDatatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
};
