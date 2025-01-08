const express = require("express")
const cors = require("cors")
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const mongoDb = require("./src/config/server")
require("dotenv").config()
 
const userRoute = require("./src/routes/userRoute")
const adminRoute = require("./src/routes/adminRoute")
const gameRoute = require("./src/routes/gameRoute")

const app = express()

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoute)
app.use("/api/admin", adminRoute)
app.use("/api/game", gameRoute);

// Create HTTP server
const server = http.createServer(app);

// Socket.IO Configuration
const io = new Server(server, {
    cors: corsOptions
});

// Socket.IO event handlers
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }
    
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
    
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired'
        });
    }
    
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Start server
const Port = process.env.PORT || 3000;
mongoDb()
    .then(() => {
        server.listen(Port, () => {
            console.log(`Server running on port ${Port}`);
            console.log(`Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    });
