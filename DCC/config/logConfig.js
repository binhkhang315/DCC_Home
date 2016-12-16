var opts = {
    logDirectory: './client/assets/log',
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};
module.exports = require('simple-node-logger').createLogManager(opts).createLogger();
