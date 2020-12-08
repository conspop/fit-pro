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
  specificDates: [{
    date: Date,
    status: String,
    heads: Number
  }]
});

module.exports = mongoose.model('Contract', contractSchema);