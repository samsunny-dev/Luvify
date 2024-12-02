const express = require("express")
const userSignIn = require("../controller/userSignIn")
const userSignUp=require("../controller/userSignup")
const userRoute = express()


userRoute.post("/signup", userSignUp)
userRoute.post("/signin",userSignIn)

