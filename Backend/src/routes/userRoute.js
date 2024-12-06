const express = require("express")
const userSignIn = require("../controller/userController/userSignIn")
const userSignUp=require("../controller/userController/userSignup")
const userVerifyController = require("../controller/userController/userVerify")
const userAuthenticate=require("../middleware/userVerification")
const swipeFunction = require("../components/user/swipeFunctions")
const userLogout=require("../controller/userController/userLogout")
const { uploadImages,deleteS3Object,replaceImage } = require("../components/user/imageFunctions")
const upload = require("../middleware/multer")

const userRoute = express()


userRoute.post("/signup", userSignUp)
userRoute.post("/verify", userVerifyController)
userRoute.post("/signin", userSignIn)
userRoute.post("/logout",userLogout)
userRoute.post("/swipeLeft",userVerifyController, swipeFunction.swipeLeft);
userRoute.post("/swipeRight",userVerifyController, swipeFunction.swipeRight)
userRoute.post("/uploadImage",userVerifyController,upload.array('images', 5),uploadImages)
userRoute.put('/replace/:key',userVerifyController, upload.single('image'), replaceImage);
userRoute.delete('/remove/:key',userVerifyController, deleteS3Object); 


module.exports=userRoute

