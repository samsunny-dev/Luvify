const ChatMessage = require('../../model/chatMessage');

exports.getChatHistory = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const userId = req.user.id; 
    console.log("user in the request : ",req.user)
    console.log("user Id :", userId)

    const messages = await ChatMessage.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 }); 

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
