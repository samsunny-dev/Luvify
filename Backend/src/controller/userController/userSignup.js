const bcrypt = require("bcrypt");
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const userModel = require("../../model/user");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Password strength validation
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  return regex.test(password);
};

const userSignUpController = async (req, res) => {
  try {
    const { name, phoneOrEmail, password, dateOfBirth, gender, preferredGenders } = req.body;

    if (!name || !phoneOrEmail || !password || !dateOfBirth || !gender || !preferredGenders) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide all required fields.",
      });
    }

    // Password validation
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password must be 8-20 characters long and contain at least one letter, one number, and one special character.",
      });
    }

    const existingUser = await userModel.findOne({ phoneOrEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

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

    await userData.save();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(phoneOrEmail)) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_OF_LIBIN,
          pass: process.env.PASSWORD_OF_NODEMAILER,
        },
      });

      const mailOptions = {
        from:`"LoveConnect Support" <noreply@luvify.com>`,
        to: phoneOrEmail,
        subject: "Verify Your Account - Luvify",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
              }
              .email-container {
                background-color: #ffffff;
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
              }
              .email-header {
                background-color: #ff4081;
                color: #ffffff;
                padding: 20px;
                border-radius: 8px 8px 0 0;
              }
              .email-header h1 {
                margin: 0;
                font-size: 24px;
              }
              .email-content {
                padding: 20px;
                font-size: 16px;
                color: #333333;
              }
              .otp {
                font-size: 24px;
                font-weight: bold;
                color: #ff4081;
                margin: 20px 0;
              }
              .email-footer {
                font-size: 14px;
                color: #777777;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Welcome to Luvify ❤️</h1>
              </div>
              <div class="email-content">
                <p>Hi there!</p>
                <p>We're excited to have you on board. To get started, please verify your account by entering the OTP below:</p>
                <div class="otp"><h4>${verificationCode}</h4></div>
                <p>This OTP is valid for the next <strong>10 minutes</strong>. Please don't share it with anyone.</p>
                <p>Need help? Contact our support team at any time.</p>
              </div>
              <div class="email-footer">
                <p>Thank you for choosing LoveConnect. Let's make meaningful connections!</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };
      
      try {
        await transporter.sendMail(mailOptions);
        return res.status(201).json({
          success: true,
          error: false,
          message: "User created successfully. Please check your email for the verification code.",
        });
      } catch (error) {
        console.error("Email Error: ", error);
        return res.status(500).json({
          success: false,
          error: true,
          message: "Error sending verification email.",
        });
      }
    } else if (/^\+\d{1,3}\d{10,15}$/.test(phoneOrEmail)) {
      try {
        await client.messages.create({
          body: `Your OTP is: ${verificationCode}`,
          from: twilioPhoneNumber,
          to: phoneOrEmail,
        });

        return res.status(201).json({
          success: true,
          error: false,
          message: "User created successfully. Please check your phone for the OTP.",
        });
      } catch (error) {
        console.error("Twilio Error: ", error);
        return res.status(500).json({
          success: false,
          error: true,
          message: "Error sending OTP via SMS.",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid phone number or email format.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = userSignUpController;
