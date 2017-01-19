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
db.Course.belongsTo(db.TrainingProgram, { foreignKey: 'trainingProgramId' });
db.TrainingProgram.hasMany(db.Course, { foreignKey: 'trainingProgramId' });
// association of table session and session_type
db.Course.belongsTo(db.CourseType, { foreignKey: 'courseTypeId' });
db.CourseType.hasMany(db.Course, { foreignKey: 'courseTypeId' });
//association of table class and course
db.Class.belongsTo(db.Course, { foreignKey: 'courseId' });
db.Course.hasMany(db.Class, { foreignKey: 'courseId' });
// //association of table class and user
db.Class.belongsTo(db.User, { foreignKey: 'trainerId' });
db.User.hasMany(db.Class, { foreignKey: 'trainerId' });
//association of table class_record and class
db.ClassRecord.belongsTo(db.Class, { foreignKey: 'classId' });
db.Class.hasMany(db.ClassRecord, { foreignKey: 'classId' });
//association of table class_record and user
db.ClassRecord.belongsTo(db.User, { foreignKey: 'traineeId' });
db.User.hasMany(db.ClassRecord, { foreignKey: 'traineeId' });
//association of table feedback and user
db.Feedback.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.Feedback, { foreignKey: 'userId' });
//association of table feedback and class
db.Feedback.belongsTo(db.Class, { foreignKey: 'classId' });
db.Class.hasMany(db.Feedback, { foreignKey: 'classId' });
//association of table RequestOpening and course
db.RequestOpening.belongsTo(db.Course, { foreignKey: 'courseId' });
db.Course.hasMany(db.RequestOpening, { foreignKey: 'courseId' });

module.exports = db;
