var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/public/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
var log = function(d) {
  var date = new Date();
  log_file.write(  "["+ date.getMonth()+"/"+ date.getDate()+"/" +date.getFullYear()+" : " +
    date.getHours() +":"+date.getMinutes()+":"+date.getSeconds() + "] : " + util.format(d) + '\n' );
};

module.exports = log;
