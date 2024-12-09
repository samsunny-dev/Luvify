const userModel=require("../../model/user")

const userLogout = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (userId) {
      await userModel.updateOne({ _id: userId }, { $unset: { verificationCode: 1 } });
    }

    res.clearCookie("user_token", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: true,
    });
  }
};

module.exports = userLogout;
