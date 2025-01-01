// controllers/addressController.js
const Address = require('../models/address');
const User = require('../models/user');

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    
    const { name, country, state, city, postalCode , streetAddress , phoneNumber} = req.body;
   
    const userId = req.user._id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = new Address({ name: name , country: country, state: state, city: city, postalCode:postalCode, streetAddress: streetAddress, phoneNumber: phoneNumber  });
    await address.save();

    user.Address.push(address._id);
    await user.save();

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an address by ID
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const user = await User.findById(address.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address.pull(address._id);
    await user.save();

    await address.deleteOne();

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAddresses = async (req, res) => {
    try {
      const addresses = await Address.find();
      res.status(200).json(addresses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a single address by ID
  exports.getAddressById = async (req, res) => {
    try {
      const address = await Address.findById(req.user._id);
      if (!address) return res.status(404).json({ message: 'Address not found' });
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update an address by ID
  exports.updateAddress = async (req, res) => {
    try {
      const address = await Address.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
      if (!address) return res.status(404).json({ message: 'Address not found' });
      res.status(200).json(address);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };



 

// Find address by user
exports.findAddressByUser = async (req, res) => {
  

  try {
    const user = await User.findById(req.user._id).populate('Address');
    if (!user) return res.status(404).json({ message: 'User not found' })

    
    res.json({ address: user.Address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};