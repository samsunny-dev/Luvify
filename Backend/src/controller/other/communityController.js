const Community = require("../../model/communityModel");

const getCommunities = async (res, req) => {
    try {
        const communities = await Community.find();
        res.status(400).json(communities);
    } catch(error) {
        res.status(500).json({message: "Error fetching Communities", error: error.message});
    }
};

const joinCommunity = async(req, res) => {
    const {communityId, userId} = req.body;

    try {
        const community = await Community.findById(communityId);

        if(!community) {
            return res.status(404).json({message: "Community not found"});
        };

        if(community.members.includes(userId)) {
            return res.status(400).json({ message: "User already a member of this community" });
        }
        
        user.community.push(communityId);
        await user.save()
        community.members.push(userId);
        await community.save()

        res.status(200).json({ message: "Successfully joined the community" });
    } catch (error) {
        res.status(500).json({ message: "Error joining community", error: error.message });
    }
};

module.exports ={getCommunities, joinCommunity};