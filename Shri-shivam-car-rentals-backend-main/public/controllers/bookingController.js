const Booking = require('../models/booking');
const Car = require('../models/car');

// Controller to save a new booking


const generateOrderId = async () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let orderId;
  let isUnique = false;

  while (!isUnique) {
    orderId = '';
    for (let i = 0; i < 6; i++) {
      orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const existingBooking = await Booking.findOne({ orderId });
    if (!existingBooking) {
      isUnique = true;
    }
  }

  return orderId;
};
// Controller to save a new booking
const saveBooking = async (req, res) => {
    const {
        
        car,
        startDate,
        startTime,
        endDate,
        endTime,
        
        receiverPhoneNum,
        totalPrice
  } = req.body;
  const user = req.user
  const orderId = await generateOrderId()
  

    try {
        // Construct datetime objects for start and end times
        const bookingStartTime = new Date(`${startDate}T${startTime}`);
        const bookingEndTime = new Date(`${endDate}T${endTime}`);

        // Check if the car is already booked at the selected time
        const existingBooking = await Booking.findOne({
            car,
            $or: [
                {
                    $and: [
                        { startDate: { $lte: bookingStartTime }, endDate: { $gte: bookingStartTime } }
                    ]
                },
                {
                    $and: [
                        { startDate: { $lte: bookingEndTime }, endDate: { $gte: bookingEndTime } }
                    ]
                },
                {
                    $and: [
                        { startDate: { $gte: bookingStartTime }, endDate: { $lte: bookingEndTime } }
                    ]
                }
            ],
            $or: [
                {
                    $and: [
                        { startTime: { $lte: bookingStartTime }, endTime: { $gte: bookingStartTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lte: bookingEndTime }, endTime: { $gte: bookingEndTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: bookingStartTime }, endTime: { $lte: bookingEndTime } }
                    ]
                }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ error: 'Car is already booked for the selected time and time' });
        }
        const newBooking = new Booking({
            user,
            car,
            startDate,
            startTime,
            endDate,
            endTime,
            orderId,
            receiverPhoneNum,
            totalPrice
          });
      
          await newBooking.save();
            

          res.json({ message: 'Booking saved successfully', booking: newBooking });
        } catch (error) {
          console.error('Error saving booking:', error.message);
          res.status(500).json({ error: 'Server error' });
        }
      };

// Controller to confirm a booking
const confirmBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.bookingConfirm = 'confirm';
    await booking.save();

    res.json({ message: 'Booking confirmed successfully', booking });
  } catch (error) {
    console.error('Error confirming booking:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to cancel a booking
const cancelBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.bookingConfirm = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car').populate('user', 'name email');

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserBookings = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const bookings = await Booking.find({ user: userId }).populate('car').populate('user', 'name email');
  
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
};


const findBookingsByCar = async (req, res) => {
  const { carId } = req.params;

  try {
    const bookings = await Booking.find({ car: carId })
      .populate('car')
      .populate({
        path: 'user',
        select: '-password' // Exclude the password field
      });

    if (bookings.length === 0) {
      return res.status(200).json([]);
    }

    res.json( bookings );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  


module.exports = {
  saveBooking,
  confirmBooking,
  cancelBooking,
  getAllBookings,
  getUserBookings,
  findBookingsByCar
};
