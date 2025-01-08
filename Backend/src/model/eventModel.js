const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        required: true,
        trim: true
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: {
        type: String,
        required: true
    },
    location: { 
        type: String, 
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Social',
            'Dating',
            'Adventure',
            'Food & Drinks',
            'Sports',
            'Arts & Culture'
        ]
    },
    image: {
        type: String,
        default: null
    },
    maxParticipants: {
        type: Number,
        required: true,
        min: 2,
        max: 1000
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    attendees: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for checking if event is full
eventSchema.virtual('isFull').get(function() {
    return this.attendees.length >= this.maxParticipants;
});

// Virtual for remaining spots
eventSchema.virtual('remainingSpots').get(function() {
    return this.maxParticipants - this.attendees.length;
});

// Pre-save middleware to update status based on date
eventSchema.pre('save', function(next) {
    const now = new Date();
    const eventDate = new Date(this.date);
    
    if (eventDate < now) {
        this.status = 'completed';
    } else if (eventDate.toDateString() === now.toDateString()) {
        this.status = 'ongoing';
    } else {
        this.status = 'upcoming';
    }
    
    next();
});

// Indexes for better query performance
eventSchema.index({ date: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ createdBy: 1 });
eventSchema.index({ 
    title: 'text', 
    description: 'text', 
    location: 'text' 
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
