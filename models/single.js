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
  heads: Number,
  status: String
});

module.exports = mongoose.model('Single', singleSchema);