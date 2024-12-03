const express = require("express")
const userSignIn = require("../controller/userController/userSignIn")
const userSignUp=require("../controller/userController/userSignup")
const userVerifyController = require("../controller/userController/userVerify")
const userRoute = express()


userRoute.post("/signup", userSignUp)
userRoute.post("/verify", userVerifyController)
// userRoute.post("/signin", userSignIn)



module.exports=userRoute

