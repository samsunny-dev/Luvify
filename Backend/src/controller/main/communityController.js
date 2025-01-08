const Community = require("../../model/communitySchema");
const User = require("../../model/user");

const createCommunity = async (req, res) => {
    const {
        name,
        description,
        location,
        interests,
        image
    } = req.body;

    try {
        // Check if community with same name exists
        const existingCommunity = await Community.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (existingCommunity) {
            return res.status(400).json({ message: "A community with this name already exists" });
        }

        const newCommunity = new Community({
            name,
            description,
            location,
            interests: Array.isArray(interests) ? interests : [interests],
            image,
            createdBy: req.user._id,
            members: [req.user._id] // Creator automatically becomes a member
        });

        await newCommunity.save();

        // Add community to user's communities
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { communities: newCommunity._id } }
        );

        const populatedCommunity = await Community.findById(newCommunity._id)
            .populate('createdBy', 'name avatar')
            .populate('members', 'name avatar');

        res.status(201).json({
            message: "Community created successfully",
            community: populatedCommunity
        });
    } catch (error) {
        console.error('Error creating community:', error);
        res.status(500).json({
            message: "Error creating community",
            error: error.message
        });
    }
};

const getCommunities = async (req, res) => {
    try {
        const { search, interest, sort = 'newest' } = req.query;
        const userId = req.user._id;

        let query = { isActive: true };

        // Apply search if provided
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by interest if provided
        if (interest) {
            query.interests = interest;
        }

        const communities = await Community.find(query)
            .populate('createdBy', 'name avatar')
            .populate('members', 'name avatar')
            .sort(sort === 'newest' ? { createdAt: -1 } : { 'members.length': -1 });

        // Add isJoined and isCreator flags for frontend
        const communitiesWithStatus = communities.map(community => ({
            ...community.toObject(),
            isJoined: community.members.some(member => 
                member._id.toString() === userId.toString()
            ),
            isCreator: community.createdBy._id.toString() === userId.toString()
        }));

        res.status(200).json(communitiesWithStatus);
    } catch (error) {
        console.error('Error fetching communities:', error);
        res.status(500).json({
            message: "Error fetching communities",
            error: error.message
        });
    }
};

const joinCommunity = async (req, res) => {
    const { communityId } = req.params;
    const userId = req.user._id;

    try {
        const community = await Community.findById(communityId);

        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        if (!community.isActive) {
            return res.status(400).json({ message: "This community is no longer active" });
        }

        if (community.members.includes(userId)) {
            return res.status(400).json({ message: "You are already a member of this community" });
        }

        // Add user to community members
        community.members.push(userId);
        await community.save();

        // Add community to user's communities
        await User.findByIdAndUpdate(
            userId,
            { $push: { communities: communityId } }
        );

        const updatedCommunity = await Community.findById(communityId)
            .populate('createdBy', 'name avatar')
            .populate('members', 'name avatar');

        res.status(200).json({
            message: "Successfully joined the community",
            community: updatedCommunity
        });
    } catch (error) {
        console.error('Error joining community:', error);
        res.status(500).json({
            message: "Error joining community",
            error: error.message
        });
    }
};

const leaveCommunity = async (req, res) => {
    const { communityId } = req.params;
    const userId = req.user._id;

    try {
        const community = await Community.findById(communityId);

        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        if (!community.members.includes(userId)) {
            return res.status(400).json({ message: "You are not a member of this community" });
        }

        if (community.createdBy.toString() === userId.toString()) {
            return res.status(400).json({ message: "Community creator cannot leave the community" });
        }

        // Remove user from community members
        community.members = community.members.filter(
            member => member.toString() !== userId.toString()
        );
        await community.save();

        // Remove community from user's communities
        await User.findByIdAndUpdate(
            userId,
            { $pull: { communities: communityId } }
        );

        const updatedCommunity = await Community.findById(communityId)
            .populate('createdBy', 'name avatar')
            .populate('members', 'name avatar');

        res.status(200).json({
            message: "Successfully left the community",
            community: updatedCommunity
        });
    } catch (error) {
        console.error('Error leaving community:', error);
        res.status(500).json({
            message: "Error leaving community",
            error: error.message
        });
    }
};

const deleteCommunity = async (req, res) => {
    const { communityId } = req.params;
    const userId = req.user._id;

    try {
        const community = await Community.findById(communityId);

        if (!community) {
            return res.status(404).json({ message: "Community not found" });
        }

        if (community.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Only community creator can delete the community" });
        }

        // Instead of actually deleting, mark as inactive
        community.isActive = false;
        await community.save();

        // Remove community from all members' communities arrays
        await User.updateMany(
            { communities: communityId },
            { $pull: { communities: communityId } }
        );

        res.status(200).json({ message: "Community deleted successfully" });
    } catch (error) {
        console.error('Error deleting community:', error);
        res.status(500).json({
            message: "Error deleting community",
            error: error.message
        });
    }
};

module.exports = {
    createCommunity,
    getCommunities,
    joinCommunity,
    leaveCommunity,
    deleteCommunity
};