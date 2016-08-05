var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email, callback){
  var query = {email: email};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id,callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if (err)
      throw err;
    callback(null, isMatch);
  });
}
