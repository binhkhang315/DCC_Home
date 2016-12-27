var log = require('../../config/logConfig');
var _trainingprogramModel= require('./DataObjects/trainingProgram');

module.exports = function(sequelize, DataTypes) {
    var Trainingprogram = sequelize.define('training_program', _trainingprogramModel, {
        classMethods:{
            getTrainingByID: function(idTP,cb) {
                log.info('/models/trainingProgram: getTrainingByID :'+ idTP);
                var query = {
                    idTP:idTP
                };
                Trainingprogram.findOne(query).then(cb);
            },
        },
        
        tableName: 'training_program'
    });
    return Trainingprogram;
};
