const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
