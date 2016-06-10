'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the candidateSchema
var CompanySchema = new Schema({
    name   : String
});


// Export the User model
module.exports = mongoose.model('Company', CompanySchema);