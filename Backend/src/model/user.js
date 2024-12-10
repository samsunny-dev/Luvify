const mongoose=require("mongoose")

const userSchema = new mongoose.Schema ({
    name: {type : String,},
    phoneOrEmail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^\+?[1-9]\d{1,14}$/;
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
            validator: (value) => /[A-Za-z]/.test(value) && /\d/.test(value) && /[@$!%*?&]/.test(value),
            message: "Password must contain at least one letter, one number, and one special character",
        },
    }
    ,
    referencedField: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReferencedModel'
    }
,
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                const age = new Date().getFullYear() - v.getFullYear();
                return age >= 18; 
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
       default:[]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            // validate: {
            //     validator: function (value) {
            //         return value.length === 2;
            //     },
            //     message: "Coordinates must have exactly two numbers",
            // },
        },
    },
    

    bio: {
        type: String,
        maxlength: 300,
    },
    jobTitle: {
        type: String,
        default: null 

    },
    status: { type: String, default: "active" },
    
  deactivationExpiresAt: { type: Date },

    company: {
        type: String,
        default: null     },

    education: {
        type: String,
        default: null     },

    interestsOrHobbies: {
        type: [String],
    },
    
    instagramHandle: {
        type: String,
    },

    spotifyTopTracks: {
        type: [String],
    },
    isVerified: {
        type: Boolean,
        default:false
},
    verificationDetails: {
        faceMatchScore: Number,
        fingerprintId: String,
    },
    verificationCode: {
        type: String,
    }, otpExpires: {
        type: Date,
    },
    communityId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Community", required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true },
    content: { 
        type: String, 
        required: true },
    message: { 
        type: String, 
        required: true }

}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = User;
