const express = require("express")
const cors=require("cors")
const mongoDb = require("./src/config/server")
 require("dotenv").config()
const userRoute = require("./src/routes/userRoute")
const adminRoute = require("./src/routes/adminRoute")
const cookieParser = require("cookie-parser");

const app = express()


Port = process.env.PORT


app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use("/api/user", userRoute)
app.use("/api/admin",adminRoute)


mongoDb().then(() => {
    app.listen(Port, () => {
        console.log(`Server running at ${Port}`)
    })  
})
