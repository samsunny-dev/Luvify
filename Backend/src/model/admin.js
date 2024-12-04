const mongoose = require("mongoose")

const adminScheme = new mongoose.Schema({
    name: { type: String, },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: { type: String, default: 'ADMIN' },   
},
{ timestamps: true }, {
    useFindAndModify: false, 
  }
)


const Admin = mongoose.model("Admin", adminScheme)
module.exports=Admin