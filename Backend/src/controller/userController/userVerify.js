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

        res.status(200).json({ message: "Email verified successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message || error });
    }
};

module.exports = userVerifyController; 