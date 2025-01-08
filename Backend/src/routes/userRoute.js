const express = require("express")
const userSignIn = require("../controller/userController/userSignIn.js")
const userSignUp=require("../controller/userController/userSignup")
const userAuthenticate=require("../middleware/userVerification")
const swipeFunction = require("../components/user/swipeFunctions")
const userLogout=require("../controller/userController/userLogout")
const { uploadImages,deleteS3Object,replaceImage,getAllImages } = require("../components/user/imageFunctions")
const {upload} = require("../middleware/multer.js")
const userVerifyController = require("../controller/userController/userVerify")
const { getChatHistory, vanishMessages, sendMessage, deletedMessage } = require("../controller/main/chatController.js")
const { getProfile, updateProfile} = require("../controller/userController/profileController.js");
const { detectFaceController } = require("../controller/other/photoController");
const uploadPhoto = require("../middleware/uploadMiddleware.js");
const verificationRoute=require("./verificationRoute.js")
const { getGroupChatHistory, sendGroupMessage } = require("../components/user/communityChat.js")
const { 
    getCommunities, 
    createCommunity, 
    joinCommunity, 
    leaveCommunity, 
    deleteCommunity 
} = require('../controller/main/communityController.js');

const { 
    getEvents, 
    createEvent, 
    joinEvent, 
    leaveEvent, 
    deleteEvent 
} = require("../controller/main/eventController.js")

const userRoute = express()

// Auth routes
userRoute.post("/signup", userSignUp)
userRoute.post("/verify", userVerifyController)
userRoute.post("/signin", userSignIn)
userRoute.post("/logout", userAuthenticate, userLogout)

// Profile routes
userRoute.post("/uploadPhoto", uploadPhoto.single("photo"), detectFaceController);
userRoute.get("/profile", userAuthenticate, getProfile);
userRoute.put("/profile", userAuthenticate, updateProfile);
userRoute.use("/verify", userAuthenticate, verificationRoute)

// Image routes
userRoute.post("/uploadImage", userAuthenticate, upload.array('images', 5), uploadImages)
userRoute.put('/replace/:key', userAuthenticate, upload.array('images', 5), replaceImage);
userRoute.get("/getImages", userAuthenticate, getAllImages)
userRoute.delete('/remove/:key', userAuthenticate, deleteS3Object); 

// Swipe routes
userRoute.post("/swipeLeft", userAuthenticate, swipeFunction.swipeLeft);
userRoute.post("/swipeRight", userAuthenticate, swipeFunction.swipeRight)

// Personal chat routes
userRoute.post("/send-message", userAuthenticate, upload.single('file'), sendMessage)
userRoute.delete("/vanish-message", userAuthenticate, vanishMessages)
userRoute.get("/chat-history/:receiverId", userAuthenticate, getChatHistory);
userRoute.delete("/deletedMessage", userAuthenticate, deletedMessage)

// Group chat routes
userRoute.get("/groupChatHistory", userAuthenticate, getGroupChatHistory)
userRoute.post("/sendGroupMessage", userAuthenticate, sendGroupMessage)

// Event routes
userRoute.get("/events", userAuthenticate, getEvents);
userRoute.post("/createEvent/:userId", userAuthenticate, createEvent);
userRoute.post("/events/:eventId/join", userAuthenticate, joinEvent);
userRoute.post("/events/:eventId/leave", userAuthenticate, leaveEvent);
userRoute.delete("/events/:eventId", userAuthenticate, deleteEvent);

// Community routes
userRoute.get("/communities", userAuthenticate, getCommunities);
userRoute.post("/communities", userAuthenticate, createCommunity);
userRoute.post("/communities/:communityId/join", userAuthenticate, joinCommunity);
userRoute.post("/communities/:communityId/leave", userAuthenticate, leaveCommunity);
userRoute.delete("/communities/:communityId", userAuthenticate, deleteCommunity);

module.exports = userRoute
