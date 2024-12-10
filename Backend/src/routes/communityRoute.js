const express = require("express");
const {getCommunities, joinCommunity} = require("../controller/other/communityController");

const communityRoute = express.Router();

communityRoute.get("/", getCommunities);

communityRoute.post("/join", joinCommunity);

module.exports = communityRoute;