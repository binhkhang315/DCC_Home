var opts = {
    logDirectory: './public/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};

var log = require('simple-node-logger').createLogManager(opts).createLogger();

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
      
      
      tableName: 'TrainingProgram'
  });
    return Trainingprogram;
};
   