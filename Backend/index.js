const express = require("express")
const mongoDb = require("./src/config/server")
const dotenv = require("dotenv").config()
const userRoute=require("./src/routes/userRoute")
const app = express()


Port=process.env.PORT

app.use("/api/user",userRoute)

mongoDb().then(() => {
    app.listen(Port, () => {
        console.log("Server running")
    })  
})
