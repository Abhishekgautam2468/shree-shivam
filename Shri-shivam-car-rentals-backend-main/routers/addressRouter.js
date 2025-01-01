const express = require('express');
const router = express.Router();
const addressController = require('../public/controllers/addressController');
const {isAuthenticated} = require('../public/middlewares/Authentication')

router.post('/', isAuthenticated, addressController.createAddress);
router.post('/user-address',isAuthenticated, addressController.findAddressByUser);

router.put('/:id',isAuthenticated, addressController.updateAddress);
router.delete('/:id',isAuthenticated, addressController.deleteAddress);

module.exports = router;