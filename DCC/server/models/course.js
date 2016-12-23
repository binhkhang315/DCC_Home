var _courseModel = require('./DataObjects/Course');
var log = require('../../config/logConfig');

module.exports = function(sequelize)
{
  var Course = sequelize.define('course', _courseModel,
  {
    classMethods:
    {
      getCourses: function(cb)
      {
        log.info('/models/course: getCourses() : ');
        var query =
        {
          where:
          {
            isDeleted: false
          }
        };
        Course.findAll(query).then(cb);
      },
      getByID: function(id, cb)
      {
        log.info('/models/course: getByID() : ' + id);
        var query =
        {
          where:
          {
            id: id,
            isDeleted: false
          }
        };
        Course.findOne(query).then(cb);
      },
      getByName: function(name, cb)
      {
        log.info('/models/course: getByName() : ' + name);
        var query =
        {
          where:
          {
            name: name,
            isDeleted: false
          }
        };
        Course.findOne(query).then(cb);
      },
      getByCategory: function(category, cb)
      {
        log.info('/models/course: getByCategory() : ' + category);
        var query =
        {
          where:
          {
            category: category,
            isDeleted: false
          }
        };
        Course.findAll(query).then(cb);
      },
    },
    tableName: 'course'
  });
  return Course;
};
