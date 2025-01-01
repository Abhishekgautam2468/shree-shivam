const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  orderId: { type: String, required: true },
  receiverPhoneNum: { type: String, required: true },
  endDate: { type: Date, required: true },
  endTime: { type: String, required: true },
  bookingConfirm: { type: String, required: true, enum: ['confirm', 'cancelled', 'pending'], default: 'pending' },
  totalPrice: { type: Number, required: true },
  createdAt: {type: Date, default: Date.now}
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;