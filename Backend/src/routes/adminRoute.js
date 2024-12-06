const express = require("express")
const adminSignUpController = require("../controller/adminController/adminSignUp")
const adminSignIn=require("../controller/adminController/adminSignIn")
const adminVerify = require("../middleware/adminVerification")
const userDetails= require("../components/admin/getUsers")
const deleteUsers=require("../components/admin/deleteUsers")
const adminLogoutController = require("../controller/adminController/adminLogout")
const adminRoute = express()

adminRoute.post("/signup", adminSignUpController)
adminRoute.post("/logout",adminLogoutController)
adminRoute.post("/signin", adminSignIn)
adminRoute.get("/all-users", adminVerify, userDetails.allUserDetails)
adminRoute.get("/user-detals",adminVerify,userDetails.findUser)
adminRoute.delete("/delete-user/:userId", adminVerify, deleteUsers)




module.exports=adminRoute