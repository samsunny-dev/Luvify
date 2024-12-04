const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../model/user");

const userSignInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Email and password are required",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("user_token", token, { httpOnly: true });
        res.status(200).json({
          data: { id: user._id, name: user.name, email: user.email, role: user.role },
          success: true,
          error: false,
          message: "Logged in successfully",
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