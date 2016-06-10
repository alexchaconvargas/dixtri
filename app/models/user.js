'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the emailSchema
var emailSchema = new Schema({
  // Since `type` is special keyword in mongoose we must set the def. to
  // and object. I.e. this would not work:
  // type: String,
  type  : {type: String},
  value : String
});


// define the userSchema
var UserSchema = new Schema({
    name   : String
});


// Export the User model
module.exports = mongoose.model('User', UserSchema);
