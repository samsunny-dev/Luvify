const express = require("express")
const adminSignUpController = require("../controller/adminController/adminSignUp")
const adminSignIn=require("../controller/adminController/adminSignIn")
const adminVerify = require("../middleware/adminVerification")
const userDetails = require("../components/admin/getUsers")
const deleteUsers=require("../components/admin/deleteUsers")
const adminRoute = express()

adminRoute.post("/signup", adminSignUpController)
adminRoute.post("/signin", adminSignIn)
adminRoute.get("/user-details", adminVerify, userDetails)
adminRoute.delete("/delete-user/:userId",adminVerify,deleteUsers)




module.exports=adminRoute