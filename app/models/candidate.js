'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the CandidateSchema
var CandidateSchema = new Schema({
    name   : String,
    firstSurname: String,
    secondSurname: String,
    birthDate: Date,
    dni: String,
    gender: String,
    country: String,
    cpCode: Number,
    province: String,
    city: String,
    adress: String,
    email: String,
    telephone : {
    	mobile: Number,
    	landline: Number
    }
});


// Export the User model
module.exports = mongoose.model('Candidate', CandidateSchema);