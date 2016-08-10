
"use strict";

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
    userID:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
  });
  return Feedback;
};
