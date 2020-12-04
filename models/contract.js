const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contractSchema = new Schema({
  studio: String,
  style: String,
  startDate: Date,
  endDate: Date,
  rate: Number
});

module.exports = mongoose.model('Contract', contractSchema);