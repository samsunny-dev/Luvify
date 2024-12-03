const mongoose=require("mongoose")

const userSchema = new mongoose.Schema ({
    name: {type : String,},
    phoneOrEmail : {
        type: String,
        required: true,
        unique: true,
        validate : {
            validator : function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^\d{10,15}$/;

                return emailRegex.test(value) || phoneRegex.test(value);
            },

            message: "Must be a valid email address or phone number",
        },
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (value) {
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return passwordRegex.test(value);
            },
            message: "Password must contain at least one letter, one number, and one special character",
        },
    },

    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                const age = new Date().getFullYear() - v.getFullYear();
                return age >= 18; // Must be 18 or older
            },
            message: "You must be at least 18 years old",
        },
    },

    gender: {
        type: String,
        enum: ["male", "female", "non-binary", "other"],
        required: true,
    },

    preferredGenders : {
        type: [String],
        enum: ["male", "female", "non-binary", "everyone"],
        required: true,
    },

    photos: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length >= 1; 
            },
            message: "At least one photo is required",
        },
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    bio: {
        type: String,
        maxlength: 300,
    },
    jobTitle: {
        type: String,
        required: false,
    },

    company: {
        type: String,
        required: false,
    },

    education: {
        type: String,
        required: false,
    },

    interestsOrHobbies: {
        type: [String],
    },
    
    instagramHandle: {
        type: String,
    },

    spotifyTopTracks: {
        type: [String],
    },

    verificationCode: {
        type: String,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;
