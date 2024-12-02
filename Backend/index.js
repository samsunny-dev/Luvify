const express = require("express")
const mongoDb = require("./src/config/server")
const dotenv=require("dotenv").config()
const app = express()


Port=process.env.PORT

mongoDb().then(() => {
    app.listen(Port, () => {
        console.log("Server running")
    })  
})
