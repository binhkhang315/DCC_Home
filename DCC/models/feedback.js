/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedback', {
    feedbackID: {
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
    classID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'class',
        key: 'classID'
      }
    },
    userID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'userID'
      }
    },
    rating: {
      type: DataTypes.ENUM('1','2','3','4','5'),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'feedback'
  });
};
