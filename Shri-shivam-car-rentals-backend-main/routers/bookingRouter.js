const express = require('express');
const router = express.Router();
const {
  saveBooking,
  confirmBooking,
  cancelBooking,
  getAllBookings,
  getUserBookings, // Add the new controller function here
  findBookingsByCar
} = require('../public/controllers/bookingController');
const authenticateOwnerToken = require('../public/middlewares/OwnerAuth')

const { isAuthenticated } = require('../public/middlewares/Authentication');

// POST route to save a new booking (requires authentication)
router.post('/', isAuthenticated, saveBooking);

// PUT route to confirm a booking (requires owner authentication)
router.put('/confirm/:id',authenticateOwnerToken, confirmBooking);

// PUT route to cancel a booking (requires owner authentication)
router.put('/cancle/:id',authenticateOwnerToken, cancelBooking);

// GET route to fetch all bookings
router.post('/getallbooking',authenticateOwnerToken, getAllBookings);

// GET route to fetch bookings for a user (requires authentication)
router.post('/user', isAuthenticated, getUserBookings);

router.post('/car/:carId',authenticateOwnerToken, findBookingsByCar);

module.exports = router;