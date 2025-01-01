const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
