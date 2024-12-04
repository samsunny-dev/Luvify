const mongoose = require("mongoose");
require("dotenv").config()


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB);
        console.log("DB connected successfully");
    } catch (error) {
        console.error(`Error in connecting db ${error}`);
    }
};

module.exports = connectDb;