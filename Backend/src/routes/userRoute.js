const express = require("express")
const userSignIn = require("../controller/userController/userSignIn")
const userSignUp=require("../controller/userController/userSignup")
const userVerifyController = require("../controller/userController/userVerify")
const swipeFunction = require("../components/user/swipeFunctions")
const userLogout=require("../controller/userController/userLogout")

const userRoute = express()


userRoute.post("/signup", userSignUp)
userRoute.post("/verify", userVerifyController)
userRoute.post("/signin", userSignIn)
userRoute.post("/logout",userLogout)
userRoute.post("/swipeLeft", swipeFunction.swipeLeft);
userRoute.post("/swipeRight",swipeFunction.swipeRight)



module.exports=userRoute

