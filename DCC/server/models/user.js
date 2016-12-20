var log = require('../../config/logConfig');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainee: {
    type: DataTypes.STRING,
    allowNull: true
  }
  }, {
    classMethods: {
      getUserByID: function(id,cb){
        log.info('/models/user: getUserByID() : ' + id);
        var query = {
          where: {id: id}
        };
        User.findOne(query).then(cb);
      },
      getUserByName: function(username,cb){
        log.info('/models/user: getUserByName() : ' + username);
        var query = {
          where: {username: username}
        };
        User.findOne(query).then(cb);
      },
    },
    tableName: 'user'
  });
  return User;
};
