var log = require('../../config/logConfig');

module.exports = function(sequelize, DataTypes) {
  var Trainingprogram = sequelize.define('training_program', {
    IdTP: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nameTP: {
        type: DataTypes.STRING,
        allowNull: true
    },
  },{
      classMethods:{
          getTrainingByID: function(idTP,cb){
              log.info('/models/user: getTrainingByID :'+ idTP);
              var query={
                  where: {idTP:idTP}
              };
              Trainingprogram.findOne(query).then(cb);
          },
      },
      tableName: 'training_program'
  });
    return Trainingprogram;
};
