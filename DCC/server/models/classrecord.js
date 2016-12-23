module.exports = function(sequelize, DataTypes) {
  var Classrecord = sequelize.define('class_record', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  },{
    tableName: 'class_record'
  });
  return Classrecord;
};
