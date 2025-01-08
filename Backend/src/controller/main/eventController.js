const Event = require("../../model/eventModel");
const User = require("../../model/user");

const createEvent = async (req, res) => {
    const { 
        title, 
        description, 
        date, 
        time,
        location, 
        maxParticipants,
        category,
        image 
    } = req.body;
    
    try {
        const newEvent = new Event({
            title,
            description,
            date,
            time,
            location,
            maxParticipants: maxParticipants || 50,
            category,
            image,
            createdBy: req.user._id,
            attendees: [req.user._id] // Creator automatically joins
        });

        await newEvent.save();

        // Add event to user's events
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { events: newEvent._id } }
        );

        const populatedEvent = await Event.findById(newEvent._id)
            .populate('createdBy', 'name avatar')
            .populate('attendees', 'name avatar');

        res.status(201).json({
            message: "Event created successfully",
            event: populatedEvent
        });

    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({
            message: "Error creating event",
            error: error.message
        });
    }
};

const getEvents = async (req, res) => {
    try {
        const { filter = 'upcoming', search } = req.query;
        const userId = req.user._id;

        let query = {};
        const currentDate = new Date();

        // Apply filters
        switch (filter) {
            case 'past':
                query.date = { $lt: currentDate };
                break;
            case 'upcoming':
                query.date = { $gte: currentDate };
                break;
            case 'joined':
                query.attendees = userId;
                break;
            case 'hosting':
                query.createdBy = userId;
                break;
        }

        // Apply search if provided
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }

        const events = await Event.find(query)
            .populate('createdBy', 'name avatar')
            .populate('attendees', 'name avatar')
            .sort({ date: filter === 'past' ? -1 : 1 });

        // Add isJoined flag for frontend
        const eventsWithJoinStatus = events.map(event => ({
            ...event.toObject(),
            isJoined: event.attendees.some(attendee => 
                attendee._id.toString() === userId.toString()
            )
        }));

        res.status(200).json(eventsWithJoinStatus);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            message: "Error fetching events",
            error: error.message
        });
    }
};

const joinEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if user is already attending
        if (event.attendees.includes(userId)) {
            return res.status(400).json({ message: "You are already attending this event" });
        }

        // Check if event is full
        if (event.attendees.length >= event.maxParticipants) {
            return res.status(400).json({ message: "Event is full" });
        }

        // Check if event date has passed
        if (new Date(event.date) < new Date()) {
            return res.status(400).json({ message: "Cannot join past events" });
        }

        // Add user to event attendees
        event.attendees.push(userId);
        await event.save();

        // Add event to user's events
        await User.findByIdAndUpdate(
            userId,
            { $push: { events: eventId } }
        );

        const updatedEvent = await Event.findById(eventId)
            .populate('createdBy', 'name avatar')
            .populate('attendees', 'name avatar');

        res.status(200).json({
            message: "Successfully joined the event",
            event: updatedEvent
        });
    } catch (error) {
        console.error('Error joining event:', error);
        res.status(500).json({
            message: "Error joining event",
            error: error.message
        });
    }
};

const leaveEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if user is actually attending
        if (!event.attendees.includes(userId)) {
            return res.status(400).json({ message: "You are not attending this event" });
        }

        // Check if user is the creator
        if (event.createdBy.toString() === userId.toString()) {
            return res.status(400).json({ message: "Event creator cannot leave the event" });
        }

        // Remove user from event attendees
        event.attendees = event.attendees.filter(
            attendee => attendee.toString() !== userId.toString()
        );
        await event.save();

        // Remove event from user's events
        await User.findByIdAndUpdate(
            userId,
            { $pull: { events: eventId } }
        );

        const updatedEvent = await Event.findById(eventId)
            .populate('createdBy', 'name avatar')
            .populate('attendees', 'name avatar');

        res.status(200).json({
            message: "Successfully left the event",
            event: updatedEvent
        });
    } catch (error) {
        console.error('Error leaving event:', error);
        res.status(500).json({
            message: "Error leaving event",
            error: error.message
        });
    }
};

const deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if user is the creator
        if (event.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Only event creator can delete the event" });
        }

        // Remove event from all attendees' events arrays
        await User.updateMany(
            { events: eventId },
            { $pull: { events: eventId } }
        );

        // Delete the event
        await Event.findByIdAndDelete(eventId);

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({
            message: "Error deleting event",
            error: error.message
        });
    }
};

module.exports = { 
    createEvent, 
    getEvents, 
    joinEvent, 
    leaveEvent, 
    deleteEvent 
};