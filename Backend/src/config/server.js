const mongoose = require("mongoose");
require("dotenv").config()

<<<<<<< HEAD

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB);
        console.log("DB connected successfully");
    } catch (error) {
        console.error(`Error in connecting db ${error}`);
=======
const connectDb = async () => {
    try {
        const mongoURI = process.env.CONNECT_DB || process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MongoDB connection URI is not defined in environment variables");
        }

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            autoIndex: true, // Build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });

        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });

        // Handle application termination
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('MongoDB connection closed through app termination');
                process.exit(0);
            } catch (err) {
                console.error('Error closing MongoDB connection:', err);
                process.exit(1);
            }
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; // Rethrow to handle it in the main application
>>>>>>> 52fd1f33b2d50562fd0f31ce54f8a2caa1c900e9
    }
};

module.exports = connectDb;