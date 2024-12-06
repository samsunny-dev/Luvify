const express = require('express');
const {createProfile, getProfile, updateProfile} = require("../routes/profileRoute.js");
const authenticate = require("../middleware/authenticate.js");
const router = express.Router();

router.post("/profile", authenticate, createProfile);
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

module.exports = router;