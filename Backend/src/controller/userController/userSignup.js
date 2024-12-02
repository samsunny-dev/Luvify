const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../model/user");

const userSignUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "User already exists",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "USER", // Default role
    });

    const savedUser = await userData.save();

    // Generate token
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Set cookie and send response
    res.cookie("user_token", token, { httpOnly: true });
    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User Created Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignUpController;

