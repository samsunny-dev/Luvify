const userModel = require("../../model/user");

const userVerifyController = async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code." });
        }

        user.isVerified = true; 
        user.verificationCode = undefined; 
        await user.save();

        const userToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "7d" }
          );
      

        res.cookie("user_token", userToken, { httpOnly: true });
        return res.status(200).json({
          data: { id: user._id, name: user.name, email: user.email, role: user.role },
          success: true,
          error: false,
          message: "Email verified successfully!",
        });
    } catch (error) {
        res.status(500).json({ message: error.message || error });
    }
};

module.exports = userVerifyController; 