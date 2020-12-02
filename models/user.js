const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  address: String,
  tutorial: Boolean,
  hst: Boolean,
  contracts: [{type: Schema.Types.ObjectId, ref: 'Contract'}],
  singles: [{type: Schema.Types.ObjectId, ref: 'Single'}],
  studios: [String]
});

module.exports = mongoose.model('User', userSchema);