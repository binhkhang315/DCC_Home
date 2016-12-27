var _classModel = require("./DataObjects/class");
module.exports = function(sequelize, DataTypes) {
    var Class = sequelize.define('class', _classModel, {
        classMethods: {
            getClass: function(cb)
            {
                log.info('/models/class: getClass()');
                Class.findAll().then(cb);
            },

            getClassByID: function(id, cb)
            {
                log.info('/models/class: getClassByID()' + id);
                var query ={
                    where:
                    {
                        id: id
                    }
                };
                Class.findOne(query).then(cb);
            },

            getClassByName: function(name, cb)
            {
                log.info('/models/class: getClassByName()' + name);
                var query ={
                    where:
                    {
                        className: name
                    }
                };
                Class.findOne(query).then(cb);
            },
        },

        tableName: 'class'
    });
    return Class;
};
