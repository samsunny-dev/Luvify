const Event = require("../../model/eventModel");

const createEvent = async (res, req) => {
    const {title, description, date, location} = req.body;
    const userId = req.params.userId;

    try {
        const newEvent = new Event ({
            title,
            description,
            date,
            location,
            createdBy: userId,
        });


        await newEvent.save();
        res.status(201).json({message: "Event Created Succesfully", event: newEvent})

    } catch (error) {
        res.status(500).json({message: "Error Creating an Event", error : error.message})
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate("createdBy", "name email");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error: error.message });
    }
};

module.exports = { createEvent, getEvents };