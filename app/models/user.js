'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define the userSchema
var UserSchema = new Schema({
    name   : String,
    firstSurname: String,
    secondSurname: String,
    birthDate: Date,
    dni: String,
    gender: String,
    country: String,
    cpCode: String,
    province: String,
    city: String,
    adress: String,
    email: String,
	mobile: Number,
	landline: Number
});


// Export the User model
module.exports = mongoose.model('User', UserSchema);
