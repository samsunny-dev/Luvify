const ChatMessage = require('../../model/chatMessage');



exports.sendMessage = async (req, res) => {
  const sender = req.user.id;
  const { receiver, message } = req.body;

  try {
      let fileUrl = req.file ? req.file.location : null; 

      const newMessage = new ChatMessage({
          sender,
          receiver,
          message,
          image: req.file?.mimetype.startsWith('image/') ? fileUrl : undefined,
          audio: req.file?.mimetype.startsWith('audio/') ? fileUrl : undefined,
      });

      await newMessage.save();

      res.status(201).json({
          success: true,
          message: 'Message sent successfully',
          data: newMessage,
      });
  } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: error.message });
  }
};


exports.getChatHistory = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const userId = req.user.id;

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

exports.vanishMessages = async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const deletedMessages = await ChatMessage.deleteMany({
            createdAt: { $lt: twentyFourHoursAgo },
        });

        console.log(`[VanishMode] Deleted ${deletedMessages.deletedCount} messages older than 24 hours.`);
      
    } catch (error) {
        console.error('Error clearing old messages:', error);
    }
};

setInterval(() => {
  exports.vanishMessages();
}, 60 * 60 * 1000);

exports.deletedMessage = async () => {
  try {
    const userId=req.user.id
    const { receiverId,messageId } = req.body
    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      senderId: userId,
      receiverId: receiverId, 
    });

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found or you are not authorized to delete it' });
    }
    return res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting message' });
  }
}