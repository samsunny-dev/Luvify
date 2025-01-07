const mongoose = require("mongoose");

const blockReportSchema = new mongoose.Schema({
    reporter : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },

    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    actionTaken: {
        type: String, 
        enum: ["None", "Blocked", "Warned", "Account Suspended"],
        default: "None",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});