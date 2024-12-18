const chatMessage = require("../../model/chatMessage");

const sendGroupMessage = async (req, res) => {
    try {
        const { communityId, message } = req.body;
        const userId = req.user.id; 

        const newMessage = new chatMessage({
            sender: userId,
            community: communityId,
            message,
        });

        await newMessage.save();

        res.status(201).json({ message: "Message sent", data: newMessage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}; 


const getGroupChatHistory = async (req, res) => {
    try {
        const { communityId } = req.params;

        const messages = await chatMessage.find({ community: communityId })
            .populate("sender", "name") 
            .sort({ createdAt: 1 }); 

        res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports={getGroupChatHistory,sendGroupMessage}