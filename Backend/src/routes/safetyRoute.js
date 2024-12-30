const express = require("express");
const { reportUser, getReports, takeAction } = require("../controllers/safetyController");
const userAuthenticate = require("../middleware/userVerification");
const adminAuthenticate = require("../middleware/adminVerification");

const safetyRoute = express.Router();

// User safety routes
safetyRoute.post("/report", userAuthenticate, reportUser);

// Admin/moderation routes
safetyRoute.get("/reports", adminAuthenticate, getReports);
safetyRoute.post("/action", adminAuthenticate, takeAction);

module.exports = safetyRoute;
