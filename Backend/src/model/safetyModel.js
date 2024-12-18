const mongoose = require("mongoose");

const blockReportSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model for the reporter
        required: true,
    },
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References the User model for the reported user
        required: true,
    },
    reason: {
        type: String,
        required: true,
        maxlength: 500, // Limit the reason description length
    },
    images: [
        {
            type: String, // Store image URLs
            required: false, // Images are optional
        },
    ],
    timestamp: {
        type: Date,
        default: Date.now, // Automatically set the time of the report
    },
});

module.exports = mongoose.model("BlockReport", blockReportSchema);
