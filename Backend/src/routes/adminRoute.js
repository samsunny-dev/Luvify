const express = require("express")
const adminSignUp = require("../controller/adminController/adminSignUp")
const adminSignIn=require("../controller/adminController/adminSignIn")
const adminRoute = express()

adminRoute.use("/signup", adminSignUp)
adminRoute.use("/signin", adminSignIn)



module.exports=adminRoute