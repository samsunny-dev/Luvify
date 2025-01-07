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
const {getCommunities, joinCommunity} = require('../controller/main/communityController.js');

const { getEvents, createEvent } = require("../controller/main/eventController.js")


const userRoute = express()


userRoute.post("/signup", userSignUp)
userRoute.post("/verify", userVerifyController)
userRoute.post("/signin", userSignIn)
userRoute.post("/logout", userAuthenticate, userLogout)
userRoute.post("/uploadPhoto", uploadPhoto.single("photo"), detectFaceController);
userRoute.post("/swipeLeft",userAuthenticate, swipeFunction.swipeLeft);
userRoute.post("/swipeRight",userAuthenticate, swipeFunction.swipeRight)
userRoute.post("/uploadImage",userAuthenticate,upload.array('images', 5),uploadImages)
userRoute.put('/replace/:key', userAuthenticate, upload.array('images', 5), replaceImage);

userRoute.get("/getImages", userAuthenticate, getAllImages)
userRoute.delete('/remove/:key', userAuthenticate, deleteS3Object); 


//user personal chats
userRoute.post("/send-message",userAuthenticate,upload.single('file'),sendMessage)
userRoute.delete("/vanish-message",userAuthenticate,vanishMessages)
userRoute.get("/chat-history/:receiverId", userAuthenticate, getChatHistory);
userRoute.delete("/deletedMessage",userAuthenticate,deletedMessage)

//profile controls
userRoute.get("/profile", userAuthenticate, getProfile);
userRoute.put("/profile", userAuthenticate, updateProfile);
userRoute.use("/verify", userAuthenticate, verificationRoute)



userRoute.get("/groupChatHistory", userAuthenticate, getGroupChatHistory)
userRoute.post("/sendGroupMessage", userAuthenticate, sendGroupMessage)

userRoute.post("/createEvent/:userId", userAuthenticate, createEvent);
userRoute.get("/events", userAuthenticate, getEvents);

userRoute.get("/communities", userAuthenticate,getCommunities);
userRoute.post("/joinCommunity", userAuthenticate, joinCommunity);







module.exports=userRoute

