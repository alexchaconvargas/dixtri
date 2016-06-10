'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the VacancySchema
var VacancySchema = new Schema({
    name   : String
});


// Export the User model
module.exports = mongoose.model('Vacancy', VacancySchema);