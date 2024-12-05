// models/Swipe.js
const mongoose = require('mongoose');

const swipeSchema = new mongoose.Schema({
  swiperId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  swipedUserId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  swipeType: { type: String, enum: ['right', 'left'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Swipe', swipeSchema);
