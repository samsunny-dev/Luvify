const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../model/user");
const adminModel = require("../../model/admin");

const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email and password are required",
      });
    }

     const admin = await adminModel.findOne({ email });
    if (admin) {
      const isAdminPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isAdminPasswordValid) {
        return res.status(401).json({
          success: false,
          error: true,
          message: "Invalid admin email or password",
        });
      }

      const adminToken = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.cookie("adminToken", adminToken, { httpOnly: true });
      return res.status(200).json({
        data: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
        success: true,
        error: false,
        message: "Admin logged in successfully",
        redirectedUrl: "/admin-dashboard",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid email or password",
      });
    }

    const isUserPasswordValid = await bcrypt.compare(password, user.password);
    if (!isUserPasswordValid) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid email or password",
      });
    }

    const userToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "7d" }
    );

      res.cookie("user_token", userToken, { httpOnly: true , secure:NODE_ENV==="production"});
      return res.status(200).json({
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
      success: true,
      error: false,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

module.exports = userSignInController;
