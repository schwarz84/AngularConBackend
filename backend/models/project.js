'use strict'


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    description: String,
    category: String,
    langs: String,
    year: Number,
    image: String
})

module.exports = mongoose.model('Project', ProjectSchema);
// Aca se usa el nombre de la base en singular por que mongoose lo que hace es ponerlo en minusculas y lo pluraliza porque? vaya a saber dios.