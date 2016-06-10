'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// define the userSchema
var UserSchema = new Schema({
    name   : String
});


// Export the User model
module.exports = mongoose.model('User', UserSchema);
