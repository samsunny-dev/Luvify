const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },

    description: { 
        type: String, 
        required: true },

    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" }],

    interests: {
        type: [String],
        enum: ["music", "sports", "technology", "art", "literature", "gaming", "travel", "fitness"],
        required: true,
    },

    communityId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Community", 
        required: true },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true },

    message: { 
        type: String, 
        required: true },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model who created the community
        required: true,

    isActive: {
        type: Boolean,
        default: true,
    },


    timestamp: { 
        type: Date, 
        default: Date.now },

});

module.exports = mongoose.model("Community", communitySchema);
