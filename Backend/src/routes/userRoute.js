const express = require("express")
const userSignIn = require("../controller/userController/userSignIn.js")
const userSignUp=require("../controller/userController/userSignup")
const userAuthenticate=require("../middleware/userVerification")
const swipeFunction = require("../components/user/swipeFunctions")
const userLogout=require("../controller/userController/userLogout")
const { uploadImages,deleteS3Object,replaceImage,getAllImages } = require("../components/user/imageFunctions")
const {upload} = require("../middleware/multer.js")
const userVerifyController = require("../controller/userController/userVerify")
const { getChatHistory } = require("../controller/other/chatController")
const { getProfile, updateProfile} = require("../controller/userController/profileController.js");


const userRoute = express()


userRoute.post("/signup", userSignUp)
userRoute.post("/verify", userVerifyController)
userRoute.post("/signin", userSignIn)
userRoute.post("/logout", userAuthenticate, userLogout)

userRoute.post("/swipeLeft",userAuthenticate, swipeFunction.swipeLeft);
userRoute.post("/swipeRight",userAuthenticate, swipeFunction.swipeRight)
userRoute.post("/uploadImage",userAuthenticate,upload.array('images', 5),uploadImages)
userRoute.put('/replace/:key', userAuthenticate, upload.array('images', 5), replaceImage);
userRoute.get("/getImages", userAuthenticate, getAllImages)
userRoute.delete('/remove/:key', userAuthenticate, deleteS3Object); 

// userRoute.delete("/clearchat",userAuthenticate,deletechat)
userRoute.get("/:receiverId", userAuthenticate, getChatHistory);

userRoute.get("/profile", userAuthenticate, getProfile);
userRoute.put("/profile", userAuthenticate, updateProfile);


module.exports=userRoute

