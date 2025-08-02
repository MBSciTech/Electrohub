// models/Offers.js
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  name: String,
  discount: Number,
  expiryDate: Date,
  userEmail: String,
  code: String,
  isUsed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Offers', offerSchema);
