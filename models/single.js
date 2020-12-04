const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleSchema = new Schema({
  studio: String,
  style: String,
  date: Date,
  time: Date,
  classLength: Number,
  rate: Number,
  base: Number,
  perHead: Number,
  estimate: Number
});

module.exports = mongoose.model('Single', singleSchema);