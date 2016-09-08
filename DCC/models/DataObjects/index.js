"use strict";

var fs        = require("fs");
var path      = require("path");
var DataObjects = {};

fs
  .readdirSync(__dirname)
  .filter(function(file)
  {
    return ((file.indexOf(".") !== 0) && (file !== "index.js"));
  })
  .forEach(function(file)
  {
    var ObjectName = file.split(".");
    var _object = require(path.join(__dirname, file));
    DataObjects[ObjectName[0]] = _object;
  });

module.exports = DataObjects;
