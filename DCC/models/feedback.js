
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Feedback = sequelize.define('Feedback', {
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // rating: {
    //   type: DataTypes.FLOAT,
    //   allowNull: true
    // },
  });
  return Feedback;
};
