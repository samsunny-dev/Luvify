const express = require("express")
const userSignIn = require("../controller/userController/userSignIn")
const userSignUp=require("../controller/userController/userSignup")
const userAuthenticate=require("../middleware/userVerification")
const swipeFunction = require("../components/user/swipeFunctions")
const userLogout=require("../controller/userController/userLogout")
const { uploadImages,deleteS3Object,replaceImage } = require("../components/user/imageFunctions")
const upload = require("../middleware/multer")
const userVerifyController = require("../controller/userController/userVerify")

const userRoute = express()


userRoute.post("/signup", userSignUp)
userRoute.post("/verify", userVerifyController)
userRoute.post("/signin", userSignIn)
userRoute.post("/logout", userAuthenticate, userLogout)

userRoute.post("/swipeLeft",userAuthenticate, swipeFunction.swipeLeft);
userRoute.post("/swipeRight",userAuthenticate, swipeFunction.swipeRight)
userRoute.post("/uploadImage",userAuthenticate,upload.array('images', 5),uploadImages)
userRoute.put('/replace/:key',userAuthenticate, upload.single('images',5), replaceImage);
userRoute.delete('/remove/:key',userAuthenticate, deleteS3Object); 


module.exports=userRoute

