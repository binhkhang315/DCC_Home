var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require("../../config/config")[env];
var sequelize = module.exports = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file)
    {
        return ((file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "DataObjects"));
    })
    .forEach(function(file)
    {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName)
{
    if ("associate" in db[modelName])
    {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// define table associations

// association of table session and training_program
db.session.belongsTo(db.training_program, { foreignKey: 'belong2TraingProgram' });
db.training_program.hasMany(db.session, { foreignKey: 'belong2TraingProgram' });
// association of table session and session_type
db.session.belongsTo(db.session_type, { foreignKey: 'belong2SessionType' });
db.session_type.hasMany(db.session, { foreignKey: 'belong2SessionType' });

// association of table session and course
db.course.belongsTo(db.session, { foreignKey: 'belong2Session' });
db.session.hasMany(db.course, { foreignKey: 'belong2Session' });

module.exports = db;
