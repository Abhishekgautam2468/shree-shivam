const Offer = require('../models/offer');

// Create a new offer
exports.createOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an offer by ID
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an offer by ID
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};