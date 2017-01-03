var log = require('../../config/logConfig');
var _trainingprogramModel= require('./DataObjects/trainingProgram');
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Trainingprogram = sequelize.define('TrainingProgram', _trainingprogramModel, {
        // uuid: {
        //     type: Sequelize.UUID,
        //     primaryKey: true
        // },
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
