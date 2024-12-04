const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../model/user");

const userSignUpController = async (req, res) => {
  try {
    const { name, phoneOrEmail, password,dateOfBirth ,gender,preferredGenders} = req.body;

    if (!name || !phoneOrEmail || !password||!dateOfBirth||!gender||!preferredGenders) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide all required fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "User already exists",
      });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new userModel({
      name,
        phoneOrEmail,
        dateOfBirth,
        gender,
        preferredGenders,
      password: hashedPassword, 
      role: "USER", 
    });

    const savedUser = await userData.save();

    const token = jwt.sign(
      { id: savedUser._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

      res.cookie("user_token", token, { httpOnly: true });
      res.cookie("userId",savedUser._id)
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

