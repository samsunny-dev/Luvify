const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const twilio = require('twilio');
const nodemailer = require("nodemailer");
const userModel = require("../../model/user");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

const userSignUpController = async (req, res) => {
    try {
        const { name, phoneOrEmail, password, dateOfBirth, gender, preferredGenders } = req.body;
        console.log("Requested items: ", req.body);

        if (!name || !phoneOrEmail || !password || !dateOfBirth || !gender || !preferredGenders) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Please provide all required fields",
            });
        }

        const existingUser = await userModel.findOne({ phoneOrEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: true,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000)

        const userData = new userModel({
            name,
            phoneOrEmail,
            dateOfBirth,
            gender,
            preferredGenders,
            password: hashedPassword,
            role: "USER",
            verificationCode,
            otpExpires,
        });

        const savedUser = await userData.save();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(phoneOrEmail)) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    user: process.env.EMAIL_OF_LIBIN,
                    pass: process.env.PASSWORD_OF_NODEMAILER,
                },
            });
    
            const mailOptions = {
                from: process.env.EMAIL_OF_LIBIN,
                to: phoneOrEmail,
                subject: 'Email Verification',
                text: `Your verification code is: ${verificationCode}`,
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Email sent: ' + info.response);
            });
    
            res.status(201).json({
                success: true,
                error: false,
                message: "User Created Successfully. Please check your email for the verification code.",
            });
            
        } else if(/^\+\d{1,3}\d{10,15}$/.test(phoneOrEmail)) {

            await client.messages.create({
                body: `Your OTP is: ${verificationCode}`,
                from: twilioPhoneNumber,
                to: phoneOrEmail,
            });

            res.status(201).json({
                success: true,
                error: false,
                message: "User created successfully. Please check your phone for the OTP.",
            });
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid phone number or email format.",
            });
        }
        

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = userSignUpController;

