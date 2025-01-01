// routes/offers/offerRoutes.js
const express = require('express');
const router = express.Router();
const offerController = require('../public/controllers/offerController');
const authenticateOwnerToken = require('../public/middlewares/OwnerAuth')

// Route for creating an offer
router.post('/',authenticateOwnerToken, offerController.createOffer);


router.get('/', offerController.getAllOffers);

// Route for updating an offer by ID
router.put('/:id',authenticateOwnerToken, offerController.updateOffer);

// Route for deleting an offer by ID
router.delete('/:id',authenticateOwnerToken, offerController.deleteOffer);

// Additional routes can be added here (e.g., get all offers, get offer by ID)...

module.exports = router;