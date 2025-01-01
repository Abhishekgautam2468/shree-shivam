const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');



// Initialize the Express application
const app = express();

// Connect to the database
connectDB();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
const allowedOrigins = ['http://localhost:3000', 'https://your-production-url.com'];

const corsOptions = {
  origin: 'https://shri-shivam-cars.vercel.app',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
// const upload =  require('./controllers/imageController')

// Define routes
// app.use('/api/deshbord/uploadimages', upload.single('file') );
app.use('/api/auth', require('./routers/authRouter'));
app.use('/api/cars', require('./routers/carRouter')); 
app.use('/api/bookings', require('./routers/bookingRouter'));
app.use('/api/address', require('./routers/addressRouter.js'));
app.use('/api/offer', require('./routers/offerRouter'));
app.use('/api/owner', require('./routers/ownerRouter'));


// Serve static assets in production
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));