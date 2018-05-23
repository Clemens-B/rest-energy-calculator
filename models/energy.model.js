const mongoose = require('mongoose');

//example Schema
var energySchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    weight: {type: Number, required: true},
    co2: {type: Number,  required: true},
    co2RefValue: {type: String},
    energyClass: {type: String},
});


//put schema into model
module.exports = mongoose.model('Energy', energySchema);