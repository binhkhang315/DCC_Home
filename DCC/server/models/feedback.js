module.exports = function(sequelize, DataTypes) {
  var Feedback = sequelize.define('Feedback', {
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  },{
    tableName: 'feedback'
  });
  return Feedback;
};
