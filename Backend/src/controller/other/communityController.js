const User = require("../../model/user");
const Community = require("../../model/communitySchema");

const getCommunities = async (req, res) => {
    try {
        const communities = await Community.find()
            .select("name description interests members") 
            .populate({
                path: "members",
                select: "name email",
            })
            .populate({
                path: "createdBy",
                select: "name email",
            });

        console.log("communities found : ", communities)
        res.status(200).json(communities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Communities", error: error.message });
    }
};


const joinCommunity = async (req, res) => {
    const { communityId, userId } = req.body;

    try {
        const community = await Community.findById(communityId);

        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isInterestMatch = community.interests.some(interest =>
            user.interestsOrHobbies.includes(interest)
        );

        if (!isInterestMatch) {
            return res.status(400).json({ message: "User's interests do not match this community's interests" });
        }

        if (community.members.includes(userId)) {
          
            return res.status(400).json({ message: "User is already a member of this community" });
        }

       

        community.members.push(userId);

        const welcomeMessage = {
            text: `${user.name} has joined the community!`,
            sender: userId,
        };
        community.messages.push(welcomeMessage);

        await community.save();


        res.status(200).json({ message: "Successfully joined the community" });
    } catch (error) {
        res.status(500).json({ message: "Error joining community", error: error.message });
    }
};




module.exports = { getCommunities, joinCommunity };
