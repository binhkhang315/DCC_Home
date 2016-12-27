var SequelizeDatatypes = require('sequelize');

module.exports=
{
    username: {
      type: SequelizeDatatypes.STRING,
      allowNull: false
    },
    status: {
      type: SequelizeDatatypes.STRING,
      allowNull: true
    },
    dob: {
      type: SequelizeDatatypes.STRING,
      allowNull: true
    },
    phone: {
      type: SequelizeDatatypes.STRING,
      allowNull: true
    },
    location: {
      type: SequelizeDatatypes.STRING,
      allowNull: true
    },
    email: {
      type: SequelizeDatatypes.STRING,
      allowNull: false
    },
    avatar: {
      type: SequelizeDatatypes.STRING,
      allowNull: false
    },
    admin: {
    type: SequelizeDatatypes.STRING,
    allowNull: true
  },
  trainer: {
    type: SequelizeDatatypes.STRING,
    allowNull: true
  },
  trainee: {
    type: SequelizeDatatypes.STRING,
    allowNull: true,
    defaultValue: 1    
  },
  createdAt:{
    type: SequelizeDatatypes.DATE,
    allowNull:false
  },
  updatedAt:
  {
    type: SequelizeDatatypes.DATE,
    allowNull: false
  },
  belong2Team:
  {
    type: SequelizeDatatypes.INTEGER,
    allowNull: true
  },
  isExperienced:{
    type: SequelizeDatatypes.BOOLEAN,
    allowNull: true
  }
}
