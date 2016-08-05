/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grade', {
    userID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'userID'
      }
    },
    classID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'class',
        key: 'classID'
      }
    },
    result: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    }
  }, {
    tableName: 'grade'
  });
};
