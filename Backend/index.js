const express = require("express")
const cors=require("cors")
const  http = require("http");
const { Server } = require("socket.io");
const mongoDb = require("./src/config/server")
 require("dotenv").config()
const userRoute = require("./src/routes/userRoute")
const adminRoute = require("./src/routes/adminRoute")
const gameRoute = require("./src/routes/gameRoute")
const cookieParser = require("cookie-parser");

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.use(cors())
app.use("/api/user", userRoute)
app.use("/api/admin",adminRoute)
app.use("/api/game", gameRoute);

const server = http.createServer(app);

const io = new Server (server, {
    cors: {
        origin: "*", // Replace "*" with your frontend URL in production
        methods: ["GET", 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("sendMessage", (data) => {
        console.log("Message Received", data)

        socket.broadcast.emit("receiveMessage", data);
    });


    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
});

const Port = process.env.PORT || 3000;
mongoDb().then(() => {
    app.listen(Port, () => {
        console.log(`Server running at ${Port}`)
    })  
})
