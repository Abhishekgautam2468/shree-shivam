const express = require('express');
const router = express.Router();
const carController = require('../public/controllers/carController');
const authenticateOwnerToken = require('../public/middlewares/OwnerAuth')


router.post('/',authenticateOwnerToken, carController.createCar);
// Route to get all cars
router.get('/', carController.getAllCars);

// Route to get a particular car by ID
router.get('/:id', carController.getCarById);

// Route to get available cars based on booking time
router.post('/available-cars', carController.getAvailableCars);

router.post('/chake-availibility', carController.checkCarAvailability);

router.post('/:id',authenticateOwnerToken, carController.deleteCarById);

module.exports = router;