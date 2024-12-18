const express = require("express");
const { createEvent, getEvents } = require("../controllers/eventController");
const userAuthenticate = require("../middleware/userVerification");

const eventRoute = express.Router();

// Route to create an event
eventRoute.post("/createEvent", userAuthenticate, createEvent);

// Route to fetch all events
eventRoute.get("/events", userAuthenticate, getEvents);

module.exports = eventRoute;
