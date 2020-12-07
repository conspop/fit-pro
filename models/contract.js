const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contractSchema = new Schema({
  studio: String,
  style: String,
  startDate: Date,
  endDate: Date,
  time: Date,
  classLength: Number,
  rate: Number,
  base: Number,
  perHead: Number,
  estimate: Number,
  taught: [String],
  cancelled: [String]

});

module.exports = mongoose.model('Contract', contractSchema);