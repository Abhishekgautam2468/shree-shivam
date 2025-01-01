const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  percentage: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  minPrice: { type: Number, required: true },
  code: { type: String, required: true }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;