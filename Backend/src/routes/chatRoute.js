const express = require("express");
const router = express.Router();
const chatController = require("../controller/chatController/chatController");
const { authenticate } = require("../middleware/authenticate");

router.get("./:receiverId", authenticate, getChatHistory);

module.exports = router;