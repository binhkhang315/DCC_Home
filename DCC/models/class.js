/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class', {
    classID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    },
    courseID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'course',
        key: 'courseID'
      }
    },
    schedule: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    trainerID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'userID'
      }
    },
    test: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'class'
  });
};
