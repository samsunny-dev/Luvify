const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    receiver: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],

    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },

    audio: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const chatMessage = mongoose.model("chatMessage", chatMessageSchema);
module.exports = chatMessage;