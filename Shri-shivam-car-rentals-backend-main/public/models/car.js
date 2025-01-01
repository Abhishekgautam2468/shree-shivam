const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    pricePerHour: {
      type: Number,
      required: true
    },
    seats: {
      type: Number,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    latePricePerHour: {
      type: Number,
      required: true
  },
    color:{
      type: String,
      required: true
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ],
    image: [
      {
        type: String,
        required: true
      }
    ],
    description: {
      type: String,
      required: true
    },
    headings: {
      head: [
        {
          type: String,
          required: true
        }
      ],
      description: [
        {
          type: String,
          required: true
        }
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
