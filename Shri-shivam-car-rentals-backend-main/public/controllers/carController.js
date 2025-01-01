const Car = require('../models/car');

const Booking = require('../models/booking');

// Function to create a new car
const createCar = async (req, res) => {
  const {
    make,
    model,
    year,
    hour_rate,
    seats,
    subtitle,
    color,
    late_hour_rate,
    car_no,
    bookings,
    img,
    description,
    descriptions,
    headings
  } = req.body;
  console.log(req.body)

  try {
    // Check if carNo is already taken
    const existingCar = await Car.findOne({ carNo : car_no });
    if (existingCar) {
      return res.status(400).json({ error: 'Car number is already taken' });
    }

    // Create new car
    const newCar = new Car({
      make,
      model,
      year,
      pricePerHour: hour_rate,
      seats,
      subtitle,
      latePricePerHour: late_hour_rate,
      carNo: car_no,
      bookings,
      color,
      image: img,
      description,
      headings:{
      head: headings,
      description: descriptions
      }
    });

    await newCar.save();
    res.json({ message: 'Car created successfully', car: newCar });
  } catch (error) {
    console.error('Error creating car:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Other controller functions: getCarById, updateCarById, deleteCarById...

// controllers/carController.js


// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().select('-bookings');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a particular car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).select('-bookings');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get available cars based on booking time
const getAvailableCars = async (req, res) => {
  const { startDate, startTime, endDate, endTime } = req.body;

  try {
    // Construct start and end Date objects with provided date and time
    const start = new Date(`${startDate}T${startTime}:00.000Z`);
    const end = new Date(`${endDate}T${endTime}:00.000Z`);

    // Find bookings that overlap with the desired booking period
    const bookings = await Booking.find({
      bookingConfirm: 'confirm',
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
        { startDate: { $lte: start }, endDate: { $gte: start } },
        { startDate: { $lte: end }, endDate: { $gte: end } }
      ]
    }).select('-bookings');

    // Get IDs of cars that are booked during the desired period
    const bookedCarIds = bookings.map(booking => booking.car);

    // Find cars that are not booked during the desired period
    const availableCars = await Car.find({ _id: { $nin: bookedCarIds } });

    res.json(availableCars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkCarAvailability = async (req, res) => {
  const { carId, startDate, startTime, endDate, endTime } = req.body;

  try {
    // Combine date and time into a single Date object
    const start = new Date(`${startDate}T${startTime}:00.000Z`);
    const end = new Date(`${endDate}T${endTime}:00.000Z`);

    // Find bookings for the specified car that overlap with the desired booking period
    const overlappingBookings = await Booking.find({
      car: carId,
      bookingConfirm: 'confirm', // Ensure only confirmed bookings are considered
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } }, // New booking overlaps with existing booking
        { startDate: { $lte: start }, endDate: { $gte: start } }, // Existing booking starts during the new booking
        { startDate: { $lte: end }, endDate: { $gte: end } } // Existing booking ends during the new booking
      ]
    });

    if (overlappingBookings.length > 0) {
      res.json({ available: false, message: 'Car is not available during the specified time period.' });
    } else {
      res.json({ available: true, message: 'Car is available during the specified time period.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//delete car

const deleteCarById = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    await Booking.deleteMany({ car: id });

    await Car.findByIdAndDelete(id);
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports = {
    createCar,
  getAllCars,
    deleteCarById,
    getAvailableCars,
  getCarById,
  checkCarAvailability

};