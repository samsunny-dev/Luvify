const chatMessage = require("../../model/chatMessage");

const ChatMessage = require('../models/ChatMessage');

exports.getChatHistory = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const userId = req.user.id; // From the auth middleware

    const messages = await ChatMessage.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 }); // Sort by oldest to newest

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
